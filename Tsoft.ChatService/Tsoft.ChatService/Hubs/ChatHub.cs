using Microsoft.AspNetCore.SignalR;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Tsoft.ChatService.Models;
using Tsoft.ChatService.ViewModel;
using Tsoft.Framework.Common;
using Tsoft.ChatService.Hubs.Interfaces;
using Tsoft.ChatService.Hubs.Models;
using TSoft.Framework.Authentication;
using User = Tsoft.ChatService.Models.User;
using Status = Tsoft.ChatService.Models.Status;
using System.Text.RegularExpressions;

namespace Tsoft.ChatService.Hubs
{

    public class ChatHub : Hub, IChatHub
    {
        private static HashSet<string> _currentConnections = new HashSet<string>();
        //public readonly static List<UserViewModel> _Connections = new List<UserViewModel>();
        public readonly static List<RoomViewModel> _Rooms = new List<RoomViewModel>();

        // Coversation Id - 
        private readonly static Dictionary<Guid, List<string>> _conversationConnectionMap = new Dictionary<Guid, List<string>>();
        private readonly static Dictionary<Guid, List<string>> _userConnectionMap = new Dictionary<Guid, List<string>>();

        private IUserService _userSerivce;
        private IChatHubService _chatHubService;

        public ChatHub(IUserService userSerivce, IChatHubService chatHubService)
        {

            _userSerivce = userSerivce;
            _chatHubService = chatHubService;
        }

        public async Task<IEnumerable<User>> GetAllUsers()
        {
            var users = await _chatHubService.GetAllUsers();
            return users;
        }

        public async Task<User> CreateUser(User user)
        {
            var users = await _chatHubService.SaveUser(user);
            return users;
        }

        public async Task SendMessage(SendMessageRequestModel request)
        {
            try
            {
                if (string.IsNullOrEmpty(request.Content.Trim()))
                {
                    return;
                }

                // Check Conversation is exist
                if (request.ConversationId == Guid.Empty && request.ReceiverId != Guid.Empty)
                {
                    var con = await _chatHubService.GetPrivateConversation(IdentityId, request.ReceiverId);
                    // Tạo conversation mới
                    if (con == null)
                    {
                        var conversationModel = new Conversation
                        {
                            Participants = new List<Guid> { IdentityId, request.ReceiverId },
                            Type = ConversationType.PRIVATE
                        };

                        var newConversation = await _chatHubService.SaveConversation(conversationModel);
                        request.ConversationId = newConversation.Id;
                    }
                    else
                    {
                        request.ConversationId = con.Id;
                    }

                    if (_userConnectionMap.ContainsKey(IdentityId))
                    {
                        foreach (var senderConnectionId in _userConnectionMap[IdentityId])
                        {
                            await Groups.AddToGroupAsync(senderConnectionId, request.ConversationId.ToString());
                        }
                    }
                    // Check receiver is online and add to conversation
                    if (_userConnectionMap.ContainsKey(request.ReceiverId))
                    {
                        foreach (var receiverConnectionId in _userConnectionMap[request.ReceiverId])
                        {
                            await Groups.AddToGroupAsync(receiverConnectionId, request.ConversationId.ToString());
                        }
                    }
                }

                // Create and save message in database
                var content = Regex.Replace(request.Content, @"(?i)<(?!img|a|/a|/img).*?>", string.Empty);
                var msg = new Message()
                {
                    Content = content,
                    SenderId = IdentityId,
                    ConversationId = request.ConversationId,
                    Timestamp = DateTime.Now,
                    LastModifiedOnDate = DateTime.Now
                };
                var newMessage = await _chatHubService.SaveMessage(msg);
                var conversation = await _chatHubService.GetConversationById(request.ConversationId);

                await _chatHubService.SaveLastActivityConversation((Guid)request.ConversationId, DateTime.Now, content);

                var response = new SendMessageResponseModel { Conversation = conversation, Message = newMessage };
                // Broadcast the message
                await Clients.Group(request.ConversationId.ToString()).SendAsync("newMessage", response);
            }
            catch (Exception e)
            {
                await Clients.Caller.SendAsync("onError", "Message not send! Message should be 1-500 characters.");
            }
        }

        public async Task Leave(string roomName)
        {
            await Groups.RemoveFromGroupAsync(Context.ConnectionId, roomName);
        }
        public async Task CreateGroup(string name)
        {
            try
            {

            }
            catch (Exception ex)
            {
                await Clients.Caller.SendAsync("onError", "Couldn't create chat room: " + ex.Message);
            }
        }

        public async Task<IEnumerable<ConversationViewModel>> GetAllConversations()
        {
            var conversations = await _chatHubService.GetConversationByUserId(IdentityId);
            return conversations;
        }


        #region FUNCIONS
        private string IdentityName
        {

            get
            {
                var identity = (ClaimsIdentity)Context.User.Identity;
                var userName = identity.FindFirst("Username")?.Value;
                return userName;
            }

        }
        private Guid IdentityId
        {
            get
            {
                var identity = (ClaimsIdentity)Context.User.Identity;
                return Guid.Parse(identity.FindFirst("Id")?.Value);
            }
        }
        #endregion

        #region OVERRIDE
        public override async Task OnConnectedAsync()
        {
            try
            {
                var connectionId = Context.ConnectionId;
                _currentConnections.Add(connectionId);
                //await SendStatus(Status.ONLINE);

                // Add các connection vào user
                if (!_userConnectionMap.ContainsKey(IdentityId))
                {
                    _userConnectionMap.Add(IdentityId, new List<string> { connectionId });
                }
                else
                {
                    _userConnectionMap[IdentityId].Add(connectionId);
                }

                // Lấy các nhóm của caller
                var caller = await _chatHubService.GetUserById(IdentityId);
                if (caller == null)
                {
                    await Clients.Caller.SendAsync(IChatHubService.UserNotFound);
                    return;
                }

                // Join các nhóm
                var conversations = await _chatHubService.GetConversationByUserId(IdentityId);
                foreach (var conversation in conversations)
                {
                    if (!_conversationConnectionMap.ContainsKey(conversation.Id))
                    {
                        _conversationConnectionMap.Add(conversation.Id, new List<string>());
                    }
                    _conversationConnectionMap[conversation.Id].Add(connectionId);
                    await Groups.AddToGroupAsync(connectionId, conversation.Id.ToString());
                }
            }
            catch (Exception ex)
            {
                await Clients.Caller.SendAsync("onError", "OnConnected:" + ex.Message);
            }
            await base.OnConnectedAsync();
        }
        public override async Task OnDisconnectedAsync(Exception exception)
        {
            try
            {
                // Lấy các nhóm có caller
                // Xóa caller khỏi nhóm
                await SendStatus(Status.OFFLINE);

                var connectionId = Context.ConnectionId;
                var connection = _currentConnections.FirstOrDefault(x => x == Context.ConnectionId);
                if (connection != null)
                {
                    _currentConnections.Remove(connection);
                }

                // Xóa các connection ra khỏi user
                _userConnectionMap[IdentityId].Remove(connectionId);

                // Thoát các nhóm
                var conversations = await _chatHubService.GetConversationByUserId(IdentityId);
                foreach (var conversation in conversations)
                {
                    _conversationConnectionMap[conversation.Id].Remove(connectionId);
                    await Groups.RemoveFromGroupAsync(connectionId, conversation.Id.ToString());
                }
            }
            catch (Exception ex)
            {
                await Clients.Caller.SendAsync("onError", "OnDisconnected: " + ex.Message);
            }

            await base.OnDisconnectedAsync(exception);
        }
        #endregion

        public async Task SendStatus(Status status)
        {
            var user = await _chatHubService.GetUserById(IdentityId);

            if (status == Status.BUSY)
            {
                user.Device = GetDevice();
                user.Status = Status.BUSY;
                var result = await _chatHubService.SaveUser(user);
                await Clients.All.SendAsync(Action.USER_BUSY, result);
            }
            else if (status == Status.ONLINE)
            {
                user.Device = GetDevice();
                user.Status = Status.ONLINE;
                var result = await _chatHubService.SaveUser(user);
                await Clients.All.SendAsync(Action.USER_ONLINE, result);
            }
            else if (status == Status.OFFLINE)
            {
                user.Device = GetDevice();
                user.Status = Status.OFFLINE;
                var result = await _chatHubService.SaveUser(user);
                await Clients.All.SendAsync(Action.USER_OFFLINE, result);
            }

        }

        private string GetDevice()
        {
            var device = Context.GetHttpContext().Request.Headers["Device"].ToString();
            if (!string.IsNullOrEmpty(device) && (device.Equals("Desktop") || device.Equals("Mobile")))
                return device;

            return "Web";
        }

        IEnumerable<User> IChatHub.GetAllUsers()
        {
            throw new NotImplementedException();
        }

        public IEnumerable<User> GetUsers(string roomName)
        {
            throw new NotImplementedException();
        }
    }

    public static class Action
    {
        public static string USER_ONLINE = "userOnline";
        public static string USER_BUSY = "userBusy";
        public static string USER_OFFLINE = "userOffline";
        public static string ADD_USER = "addUser";
    }
}

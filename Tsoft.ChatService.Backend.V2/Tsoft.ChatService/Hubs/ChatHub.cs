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
using Tsoft.ChatService.Hubs.Core;

namespace Tsoft.ChatService.Hubs
{

    public class ChatHub : Hub, IChatHub
    {
        private static HashSet<string> _currentConnections = new HashSet<string>();
        //public readonly static List<UserViewModel> _Connections = new List<UserViewModel>();
        public readonly static List<RoomViewModel> _Rooms = new List<RoomViewModel>();

        // User - Connection Mapping
        private readonly static ConnectionMapping<Guid> _userConnectionMapping = new ConnectionMapping<Guid>();

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
                if (string.IsNullOrEmpty(request.Message.Trim()))
                {
                    return;
                }

                var content = Regex.Replace(request.Message, @"(?i)<(?!img|a|/a|/img).*?>", string.Empty);

                // Save conversation
                request.Conversation.LastMessage = content;
                var conversation = await _chatHubService.SaveConversation(request.Conversation);

                // Create and save message in database
                var msgModel = new Message()
                {
                    Content = content,
                    SenderId = IdentityId,
                    ConversationId = conversation.Id,
                    Timestamp = DateTime.Now,
                    LastModifiedOnDate = DateTime.Now
                };
                var message = await _chatHubService.SaveMessage(msgModel);


                // Check Conversation is exist
                foreach(var userId in conversation.Participants)
                {
                    foreach(var connectionId in _userConnectionMapping.GetConnections(userId)){
                        await Groups.AddToGroupAsync(connectionId, conversation.Id.ToString());
                    }
                }


                // Broadcast the message
                await Clients.Group(conversation.Id.ToString()).SendAsync("newMessage", new { conversation, message });
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

        public async Task<IEnumerable<Message>> GetMessagesByConversationId(Guid conversationId, int offset, int size)
        {
            var messages = await _chatHubService.GetMessagesByConversationId(conversationId, offset, size);
            return messages;
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

                _userConnectionMapping.Add(IdentityId, connectionId);

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
                _userConnectionMapping.Remove(IdentityId, connectionId);

                // Thoát các nhóm
                var conversations = await _chatHubService.GetConversationByUserId(IdentityId);
                foreach (var conversation in conversations)
                {
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

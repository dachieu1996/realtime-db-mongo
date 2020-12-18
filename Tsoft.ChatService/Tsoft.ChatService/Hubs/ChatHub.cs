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

namespace Tsoft.ChatService.Hubs
{

    public class ChatHub : Hub, IChatHub
    {
        //public readonly static List<UserViewModel> _Connections = new List<UserViewModel>();
        public readonly static List<RoomViewModel> _Rooms = new List<RoomViewModel>();
        private readonly static Dictionary<string, string> _ConnectionsMap = new Dictionary<string, string>();

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

        public async Task SendPrivate(string receiverName, string message)
        {
            //if (_ConnectionsMap.TryGetValue(receiverName, out string userId))
            //{
            //    // Who is the sender;
            //    //var sender = _Connections.Where(u => u.Username == IdentityName).First();

            //    if (!string.IsNullOrEmpty(message.Trim()))
            //    {
            //        // Build the message
            //        var messageViewModel = new MessageViewModel()
            //        {
            //            Content = Regex.Replace(message, @"(?i)<(?!img|a|/a|/img).*?>", string.Empty),
            //            From = sender.Fullname,
            //            AvatarUrl = sender.AvatarUrl,
            //            To = "",
            //            Timestamp = DateTime.Now.ToLongTimeString()
            //        };

            //        // Send the message
            //        await Clients.Client(userId).SendAsync("newMessage", messageViewModel);
            //        await Clients.Caller.SendAsync("newMessage", messageViewModel);
            //    }
            //}
        }

        public async Task SendToPrivateConversation(SendPrivateMessageRequestModel model)
        {
            if (string.IsNullOrEmpty(model.ConversationId))
            {
                var newConversation = new Conversation
                {
                    Participants = new List<string> { model.UserId, IdentityId },
                    Type = ConversationType.PRIVATE
                };
                _chatHubService.SaveConversation(newConversation);
            }
        }

        public async Task SendToGroupConversation(SendGroupMessageRequestModel model)
        {

        }

        //public async Task SendToRoom(string roomName, string message)
        //{
        //    try
        //    {
        //        var user = _users.Find(u => u.Username == IdentityName).FirstOrDefault();
        //        var room = _room.Find(r => r.Name == roomName).FirstOrDefault();

        //        if (!string.IsNullOrEmpty(message.Trim()))
        //        {
        //            // Create and save message in database
        //            var msg = new Message()
        //            {
        //                Content = Regex.Replace(message, @"(?i)<(?!img|a|/a|/img).*?>", string.Empty),
        //                SenderId = user.Id,
        //                ConversationId = room.Id,
        //                Timestamp = DateTime.Now
        //            };
        //            _message.InsertOne(msg);

        //            var update = Builders<Conversation>.Update
        //                .Set("LastActivityTime", msg.Timestamp);
        //            _room.UpdateOne(x => x.Id == room.Id, update);

        //            // Broadcast the message
        //            var messageViewModel = new MessageViewModel();
        //            messageViewModel.AvatarUrl = user.AvatarUrl;
        //            messageViewModel.Content = msg.Content;
        //            messageViewModel.From = user.Username;
        //            messageViewModel.To = room.Name;
        //            messageViewModel.Timestamp = msg.Timestamp.ToString();
        //            await Clients.Group(roomName).SendAsync("newMessage", messageViewModel);
        //        }
        //    }
        //    catch (Exception)
        //    {
        //        await Clients.Caller.SendAsync("onError", "Message not send! Message should be 1-500 characters.");
        //    }
        //}
        //public async Task Join(string roomName)
        //{
        //    try
        //    {
        //        var user = _Connections.Where(u => u.Username == IdentityName).FirstOrDefault();
        //        if (user != null && user.CurrentRoom != roomName)
        //        {
        //            // Remove user from others list
        //            if (!string.IsNullOrEmpty(user.CurrentRoom))
        //                await Clients.OthersInGroup(user.CurrentRoom).SendAsync("removeUser", user);

        //            // Join to new cha  t room
        //            await Leave(user.CurrentRoom);
        //            await Groups.AddToGroupAsync(Context.ConnectionId, roomName);
        //            user.CurrentRoom = roomName;

        //            // Tell others to update their list of users
        //            //await Clients.OthersInGroup(roomName).SendAsync(Action.ADD_USER, user);
        //        }
        //    }
        //    catch (Exception ex)
        //    {
        //        await Clients.Caller.SendAsync("onError", "You failed to join the chat room!" + ex.Message);
        //    }
        //}
        public async Task Leave(string roomName)
        {
            await Groups.RemoveFromGroupAsync(Context.ConnectionId, roomName);
        }
        public async Task CreateGroup(string name)
        {
            //try
            //{

            //    // Accept: Letters, numbers and one space between words.
            //    Match match = Regex.Match(name, @"^\w+( \w+)*$");
            //    if (!match.Success)
            //    {
            //        await Clients.Caller.SendAsync("onError", "Invalid room name!\nRoom name must contain only letters and numbers.");
            //    }
            //    else if (name.Length < 5 || name.Length > 100)
            //    {
            //        await Clients.Caller.SendAsync("onError", "Room name must be between 5-100 characters!");
            //    }

            //    else
            //    {
            //        // Create and save chat room in database
            //        var user = _users.Find(u => u.Username == IdentityName).FirstOrDefault();
            //        var room = new Conversation()
            //        {
            //            Name = roomName,
            //        };
            //        _room.InsertOne(room);


            //        if (room != null)
            //        {
            //            // Update room list
            //            var roomViewModel = new RoomViewModel();
            //            roomViewModel.Id = room.Id;
            //            roomViewModel.Name = room.Name;
            //            _Rooms.Add(roomViewModel);
            //            await Clients.All.SendAsync("addChatRoom", roomViewModel);
            //        }
            //    }
            //}
            //catch (Exception ex)
            //{
            //    await Clients.Caller.SendAsync("onError", "Couldn't create chat room: " + ex.Message);
            //}
        }

        public async Task DeleteRoom(string roomName)
        {
            //try
            //{
            //    // Delete from database
            //    var room = _room.FindOneAndDelete(r => r.Name == roomName);

            //    // Delete from list
            //    var roomViewModel = _Rooms.First(r => r.Name == roomName);
            //    _Rooms.Remove(roomViewModel);

            //    // Move users back to Lobby
            //    await Clients.Group(roomName).SendAsync("onRoomDeleted", string.Format("Room {0} has been deleted.\nYou are now moved to the Lobby!", roomName));

            //    // Tell all users to update their room list
            //    await Clients.All.SendAsync("removeChatRoom", roomViewModel);
            //}
            //catch (Exception)
            //{
            //    await Clients.Caller.SendAsync("onError", "Can't delete this chat room. Only owner can delete this room.");
            //}
        }
        public async Task<IEnumerable<ConversationViewModel>> GetConversationsAsync()
        {
            var conversations = await _chatHubService.GetConversations(IdentityId);
            return conversations;
        }

        //public RoomMessageUserViewModel GetMessageHistory(string roomName)
        //{
        //    var room = _room.Find(x => x.Name == roomName).ToList();
        //    var roomId = _room.Find(x => x.Name == roomName).FirstOrDefault();
        //    var user = _users.Find(user => true).ToList();
        //    var message = _message.Find(message => message.ConversationId == roomId.Id).ToList();
        //    var query = from c in room
        //                select new RoomMessageUserViewModel
        //                {
        //                    Id = c.Id,
        //                    RoomName = c.Name,
        //                    UserMessage = (from u in user
        //                                   join m in message on u.Id equals m.SenderId
        //                                   select new UserMessage
        //                                   {
        //                                       UserId = u.Id,
        //                                       Name = u.Username,
        //                                       MessageId = m.Id,
        //                                       Content = m.Content,
        //                                       TimeCreated = m.Timestamp
        //                                   }).ToList(),
        //                };
        //    var result = query.OrderByDescending(m => m.UserMessage.OrderByDescending(x => x.TimeCreated)).FirstOrDefault();
        //    return result;
        //}
        private string IdentityName
        {

            get
            {
                var identity = (ClaimsIdentity)Context.User.Identity;
                var userName = identity.FindFirst("Username")?.Value;
                return userName;
            }

        }
        private string IdentityId
        {
            get
            {
                var identity = (ClaimsIdentity)Context.User.Identity;
                return identity.FindFirst("Id")?.Value;
            }
        }

        public override async Task OnConnectedAsync()
        {
            try
            {
                await SendStatus(Status.ONLINE);
            }
            catch (Exception ex)
            {
                Clients.Caller.SendAsync("onError", "OnConnected:" + ex.Message);
            }
            await base.OnConnectedAsync();
        }
        public override async Task OnDisconnectedAsync(Exception exception)
        {
            try
            {
                await SendStatus(Status.OFFLINE);
            }
            catch (Exception ex)
            {
                Clients.Caller.SendAsync("onError", "OnDisconnected: " + ex.Message);
            }

            await base.OnDisconnectedAsync(exception);
        }

        public async Task SendStatus(Status status)
        {
            var user = await _chatHubService.GetUserById(IdentityId);

            if (status == Status.BUSY)
            {
                user.Device = GetDevice();
                user.Status = Status.BUSY;
                var result = await _chatHubService.SaveUser(user);
                await Clients.Others.SendAsync(Action.USER_BUSY, result);
            }
            else if (status == Status.ONLINE)
            {
                user.Device = GetDevice();
                user.Status = Status.ONLINE;
                var result = await _chatHubService.SaveUser(user);
                await Clients.Others.SendAsync(Action.USER_ONLINE, result);
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

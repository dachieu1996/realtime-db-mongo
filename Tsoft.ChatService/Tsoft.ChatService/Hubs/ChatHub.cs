using Microsoft.AspNetCore.SignalR;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;
using System.Threading.Tasks;
using Tsoft.ChatService.Models;
using Tsoft.ChatService.ViewModel;
using Tsoft.Framework.Common;
using TSoft.Framework.Authentication;
using Status = Tsoft.ChatService.ViewModel.Status;

namespace Tsoft.ChatService.Hubs
{
    [Authorize]
    public class ChatHub : Hub
    {
        public readonly static List<UserViewModel> _Connections = new List<UserViewModel>();
        public readonly static List<RoomViewModel> _Rooms = new List<RoomViewModel>();
        private readonly static Dictionary<string, string> _ConnectionsMap = new Dictionary<string, string>();
        private static bool _firstLoad = false;

        private readonly IMongoCollection<Message> _message;
        private readonly IMongoCollection<ApplicationUser> _users;
        private readonly IMongoCollection<Room> _room;

        private IUserService _userSerivce;

        public ChatHub(ChatDatabaseSettings settings, IUserService userSerivce)
        {
                var client = new MongoClient(settings.ConnectionString);
                var database = client.GetDatabase(settings.DatabaseName);

                _message = database.GetCollection<Message>(settings.MessagesCollectionName);
                _users = database.GetCollection<ApplicationUser>(settings.UsersCollectionName);
                _room = database.GetCollection<Room>(settings.ConversationsCollectionName);
                _userSerivce = userSerivce;

            if (_firstLoad == false)
            {
                var userVM = AutoMapperUtils.AutoMap<ApplicationUser, UserViewModel>(_users.Find(x => true).ToList());
                foreach (var user in userVM)
                {
                    user.Status = Status.OFFLINE;
                    _Connections.Add(user);
                }
                _firstLoad = true;
            }
        }
        public async Task SendPrivate(string receiverName, string message)
        {
            if (_ConnectionsMap.TryGetValue(receiverName, out string userId))
            {
                // Who is the sender;
                var sender = _Connections.Where(u => u.Username == IdentityName).First();

                if (!string.IsNullOrEmpty(message.Trim()))
                {
                    // Build the message
                    var messageViewModel = new MessageViewModel()
                    {
                        Content = Regex.Replace(message, @"(?i)<(?!img|a|/a|/img).*?>", string.Empty),
                        From = sender.Fullname,
                        AvatarUrl = sender.AvatarUrl,
                        To = "",
                        Timestamp = DateTime.Now.ToLongTimeString()
                    };

                    // Send the message
                    await Clients.Client(userId).SendAsync("newMessage", messageViewModel);
                    await Clients.Caller.SendAsync("newMessage", messageViewModel);
                }
            }
        }
        public async Task SendToRoom(string roomName, string message)
        {
            try
            {
                var user = _users.Find(u => u.Username == IdentityName).FirstOrDefault();
                var room = _room.Find(r => r.Name == roomName).FirstOrDefault();

                if (!string.IsNullOrEmpty(message.Trim()))
                {
                    // Create and save message in database
                    var msg = new Message()
                    {
                        Content = Regex.Replace(message, @"(?i)<(?!img|a|/a|/img).*?>", string.Empty),
                        SenderId = user.Id,
                        RoomId = room.Id,
                        Timestamp = DateTime.Now
                    };
                    _message.InsertOne(msg);

                    var update = Builders<Room>.Update
                        .Set("LastActivityTime", msg.Timestamp);
                    _room.UpdateOne(x => x.Id == room.Id, update);

                    // Broadcast the message
                    var messageViewModel = new MessageViewModel();
                    messageViewModel.AvatarUrl = user.AvatarUrl;
                    messageViewModel.Content = msg.Content;
                    messageViewModel.From = user.Username;
                    messageViewModel.To = room.Name;
                    messageViewModel.Timestamp = msg.Timestamp.ToString();
                    await Clients.Group(roomName).SendAsync("newMessage", messageViewModel);
                }
            }
            catch (Exception)
            {
                await Clients.Caller.SendAsync("onError", "Message not send! Message should be 1-500 characters.");
            }
        }
        public async Task Join(string roomName)
        {
            try
            {
                var user = _Connections.Where(u => u.Username == IdentityName).FirstOrDefault();
                if (user != null && user.CurrentRoom != roomName)
                {
                    // Remove user from others list
                    if (!string.IsNullOrEmpty(user.CurrentRoom))
                        await Clients.OthersInGroup(user.CurrentRoom).SendAsync("removeUser", user);

                    // Join to new chat room
                    await Leave(user.CurrentRoom);
                    await Groups.AddToGroupAsync(Context.ConnectionId, roomName);
                    user.CurrentRoom = roomName;

                    // Tell others to update their list of users
                    await Clients.OthersInGroup(roomName).SendAsync("addUser", user);
                }
            }
            catch (Exception ex)
            {
                await Clients.Caller.SendAsync("onError", "You failed to join the chat room!" + ex.Message);
            }
        }
        public async Task Leave(string roomName)
        {
            await Groups.RemoveFromGroupAsync(Context.ConnectionId, roomName);
        }
        public async Task CreateRoom(string roomName)
        {
            try
            {

                // Accept: Letters, numbers and one space between words.
                Match match = Regex.Match(roomName, @"^\w+( \w+)*$");
                if (!match.Success)
                {
                    await Clients.Caller.SendAsync("onError", "Invalid room name!\nRoom name must contain only letters and numbers.");
                }
                else if (roomName.Length < 5 || roomName.Length > 100)
                {
                    await Clients.Caller.SendAsync("onError", "Room name must be between 5-100 characters!");
                }

                else
                {
                    // Create and save chat room in database
                    var user = _users.Find(u => u.Username == IdentityName).FirstOrDefault();
                    var room = new Room()
                    {
                        Name = roomName,
                    };
                    _room.InsertOne(room);


                    if (room != null)
                    {
                        // Update room list
                        var roomViewModel = new RoomViewModel();
                        roomViewModel.Id = room.Id;
                        roomViewModel.Name = room.Name;
                        _Rooms.Add(roomViewModel);
                        await Clients.All.SendAsync("addChatRoom", roomViewModel);
                    }
                }
            }
            catch (Exception ex)
            {
                await Clients.Caller.SendAsync("onError", "Couldn't create chat room: " + ex.Message);
            }
        }

        public async Task DeleteRoom(string roomName)
        {
            try
            {
                // Delete from database
                var room = _room.FindOneAndDelete(r => r.Name == roomName);

                // Delete from list
                var roomViewModel = _Rooms.First(r => r.Name == roomName);
                _Rooms.Remove(roomViewModel);

                // Move users back to Lobby
                await Clients.Group(roomName).SendAsync("onRoomDeleted", string.Format("Room {0} has been deleted.\nYou are now moved to the Lobby!", roomName));

                // Tell all users to update their room list
                await Clients.All.SendAsync("removeChatRoom", roomViewModel);
            }
            catch (Exception)
            {
                await Clients.Caller.SendAsync("onError", "Can't delete this chat room. Only owner can delete this room.");
            }
        }
        public IEnumerable<RoomViewModel> GetRooms()
        {
            //var a = new List<string>();
            //a.Add(IdentityId);
            //var newGroupRoom = new Room
            //{
            //    Name = "Tsof1t",
            //    Type = RoomType.GROUP,
            //    Participants = a
            //};
            //_room.InsertOne(newGroupRoom);

            var rooms = _room.Find(room => room.Participants.Contains(IdentityId) && room.Type != RoomType.PRIVATE).ToList();
            if (_Rooms.Count == 0)
            {
                foreach (var room in rooms)
                {
                    var roomViewModel = new RoomViewModel();
                    roomViewModel.Id = room.Id;
                    roomViewModel.Name = room.Name;
                    _Rooms.Add(roomViewModel);
                }
            }

            return _Rooms.ToList();
        }

        public IEnumerable<UserViewModel> GetAllUsers()
        {
            return _Connections.ToList();
        }

        public IEnumerable<UserViewModel> GetUsers(string roomName)
        {
            return _Connections.Where(u => u.CurrentRoom == roomName).ToList();
        }
        public RoomMessageUserViewModel GetMessageHistory(string roomName)
        {
            var room = _room.Find(x => x.Name == roomName).ToList();
            var roomId = _room.Find(x => x.Name == roomName).FirstOrDefault();
            var user = _users.Find(user => true).ToList();
            var message = _message.Find(message => message.RoomId == roomId.Id).ToList();
            var query = from c in room
                        select new RoomMessageUserViewModel
                        {
                            Id = c.Id,
                            RoomName = c.Name,
                            UserMessage = (from u in user
                                           join m in message on u.Id equals m.SenderId
                                           select new UserMessage
                                           {
                                               UserId = u.Id,
                                               Name = u.Username,
                                               MessageId = m.Id,
                                               Content = m.Content,
                                               TimeCreated = m.Timestamp
                                           }).ToList(),
                        };
            var result = query.OrderByDescending(m => m.UserMessage.OrderByDescending(x => x.TimeCreated)).FirstOrDefault();
            return result;
        }
        private string IdentityName
        {
            get { return Context.User.Identity.Name; }
        }
        private string IdentityId
        {
            get
            {
                var identity = (ClaimsIdentity)Context.User.Identity;
                return identity.FindFirst("Id")?.Value;
            }
        }

        public override Task OnConnectedAsync()
        {
            try
            {
                var userViewModel = new UserViewModel();
                if (!_Connections.Any(u => u.Id == IdentityId))
                {
                    var user = _userSerivce.GetById(Guid.Parse(IdentityId)).Result;
                    userViewModel = AutoMapperUtils.AutoMap<User, UserViewModel>(user);
                    userViewModel.Device = GetDevice();
                    userViewModel.CurrentRoom = "";
                    userViewModel.Status = Status.ONLINE;
                    _Connections.Add(userViewModel);
                }
                else
                {
                    userViewModel = _Connections.FirstOrDefault(u => u.Id == IdentityId);
                    userViewModel.Status = Status.ONLINE;
                    userViewModel.Device = GetDevice();
                }
                //_ConnectionsMap.Add(IdentityId, Context.ConnectionId);
                Clients.Others.SendAsync(Action.USER_ONLINE, userViewModel);
            }
            catch (Exception ex)
            {
                Clients.Caller.SendAsync("onError", "OnConnected:" + ex.Message);
            }
            return base.OnConnectedAsync();
        }
        public override Task OnDisconnectedAsync(Exception exception)
        {
            try
            {
                var user = _Connections.Where(u => u.Username == IdentityName).First();
                _Connections.Remove(user);

                // Tell other users to remove you from their list
                Clients.OthersInGroup(user.CurrentRoom).SendAsync("removeUser", user);

                // Remove mapping
                //_ConnectionsMap.Remove(user.Username);
            }
            catch (Exception ex)
            {
                Clients.Caller.SendAsync("onError", "OnDisconnected: " + ex.Message);
            }

            return base.OnDisconnectedAsync(exception);
        }
        private string GetDevice()
        {
            var device = Context.GetHttpContext().Request.Headers["Device"].ToString();
            if (!string.IsNullOrEmpty(device) && (device.Equals("Desktop") || device.Equals("Mobile")))
                return device;

            return "Web";
        }
    }

    public static class Action
    {
        public static string USER_ONLINE = "userOnline";
    }
}

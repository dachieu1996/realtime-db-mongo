using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Tsoft.ChatService.Models;
using Tsoft.ChatService.ViewModel;

namespace Tsoft.ChatService.Hubs.Interfaces
{
    public interface IChatHub
    {
        Task SendToRoom(string roomName, string message);
        Task Join(string roomName);
        Task Leave(string roomName);
        Task CreateRoom(string roomName);
        Task CreateUser(ApplicationUser user);
        Task DeleteRoom(string roomName);
        IEnumerable<RoomViewModel> GetRooms();
        IEnumerable<UserViewModel> GetAllUsers();
        IEnumerable<UserViewModel> GetUsers(string roomName);
        RoomMessageUserViewModel GetMessageHistory(string roomName);
    }
}

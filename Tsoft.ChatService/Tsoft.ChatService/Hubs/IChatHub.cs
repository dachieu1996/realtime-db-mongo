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
        //Task SendToRoom(string roomName, string message);
        //Task Join(string roomName);
        Task Leave(string roomName);
        Task CreateGroup(string name);
        Task<User> CreateUser(User user);
        Task DeleteRoom(string roomName);
        IEnumerable<User> GetAllUsers();
        IEnumerable<User> GetUsers(string roomName);
        //RoomMessageUserViewModel GetMessageHistory(string roomName);
    }
}

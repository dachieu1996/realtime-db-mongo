using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Tsoft.ChatService.Models;
using Tsoft.ChatService.ViewModel;

namespace Tsoft.ChatService.Hubs.Interfaces
{
    public interface IChatHubService
    {
        Task<User> GetUserById(string Id);
        Task<User> SaveUser(User model);
        Task<List<User>> GetAllUsers();
        Task<List<ConversationViewModel>> GetConversations(string userId);
        Task SaveConversation(Conversation model);
    }
}

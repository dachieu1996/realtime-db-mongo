using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Tsoft.ChatService.Hubs.Models;
using Tsoft.ChatService.Models;
using Tsoft.ChatService.ViewModel;

namespace Tsoft.ChatService.Hubs.Interfaces
{
    public interface IChatHubService
    {
        static string UserNotFound = "user-not-found";
        static string ConversationNotFound = "conversation-not-found";
        Task<User> GetUserById(Guid Id);
        Task<User> SaveUser(User model);
        Task<Conversation> SaveConversation(Conversation model);
        Task<Conversation> SaveLastActivityConversation(Guid conversationId, DateTime lastActivityTime, string lastMessageContent);
        Task<IEnumerable<Message>> GetMessagesByConversationId(Guid conversationId);
        Task<Message> SaveMessage(Message model);
        Task<List<User>> GetAllUsers();
        Task<List<ConversationViewModel>> GetConversationByUserId(Guid userId);
        Task<Conversation> GetConversationById(Guid id);
        Task<Conversation> GetPrivateConversation(Guid userId1, Guid userId2);
        Task<IEnumerable<Message>> GetMessagesByConversationId(Guid conversationId, int offset, int size = 5);
    }
}

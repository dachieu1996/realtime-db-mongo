using MongoDB.Bson;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Tsoft.ChatService.Hubs.Interfaces;
using Tsoft.ChatService.Hubs.Models;
using Tsoft.ChatService.Models;
using Tsoft.ChatService.ViewModel;
using Tsoft.Framework.Common;

namespace Tsoft.ChatService.Hubs.Services
{
    public class ChatHubService : IChatHubService
    {
        private readonly IMongoCollection<Message> _message;
        private readonly IMongoCollection<User> _users;
        private readonly IMongoCollection<Conversation> _conversation;

        public ChatHubService(ChatDatabaseSettings settings)
        {
            var client = new MongoClient(settings.ConnectionString);
            var database = client.GetDatabase(settings.DatabaseName);

            _message = database.GetCollection<Message>(settings.MessagesCollectionName);
            _users = database.GetCollection<User>(settings.UsersCollectionName);
            _conversation = database.GetCollection<Conversation>(settings.ConversationsCollectionName);
        }

        public async Task<List<User>> GetAllUsers()
        {
            var users = await _users.Find(x => true).ToListAsync();
            return AutoMapperUtils.AutoMap<User, User>(users);
        }

        public async Task<Conversation> GetConversationById(Guid id)
        {
            var conversation = await _conversation.Find(x => x.Id == id).FirstOrDefaultAsync();
            return conversation;
        }

        public async Task<List<ConversationViewModel>> GetConversationByUserId(Guid userId)
        {
            var conversations = await _conversation.Find(c => c.Participants.Contains(userId)).ToListAsync();
            var conversationsVM = new List<ConversationViewModel>();
            foreach (var conversation in conversations)
            {
                var conVM = AutoMapperUtils.AutoMap<Conversation, ConversationViewModel>(conversation);
                //conVM.Messages = await GetMessagesByConversationId(conversation.Id);
                conversationsVM.Add(conVM);
            }
            return conversationsVM;
        }

        public async Task<IEnumerable<Message>> GetMessagesByConversationId(Guid conversationId, int offset, int size = 5)
        {
            var total = await _message.Find(c => c.ConversationId == conversationId).CountDocumentsAsync();
            var skip = 0;
            if (total - offset - size > 0)
                skip = (int)(total - offset - size);
            var messages = await _message.Find(c => c.ConversationId == conversationId).Skip(skip).Limit(size).ToListAsync();
            return messages;
        }

        public async Task<IEnumerable<Message>> GetMessagesByConversationId(Guid conversationId)
        {
            var messages = await _message.Find(x => x.ConversationId == conversationId).ToListAsync();
            return messages;
        }

        public async Task<User> GetUserById(Guid Id)
        {
            var user = await _users.Find(x => x.Id == Id).FirstOrDefaultAsync();
            return user;
        }

        public async Task<Conversation> GetPrivateConversation(Guid userId1, Guid userId2)
        {
            var listUserId = new List<Guid>();
            listUserId.Add(userId1);
            listUserId.Add(userId2);
            var conversation = await _conversation.Find(x => x.Type == ConversationType.PRIVATE && x.Participants.Equals(listUserId)).FirstOrDefaultAsync();
            return conversation;
        }

        public async Task<Conversation> SaveConversation(Conversation model)
        {
            var conversationInDb = GetConversationById(model.Id);
            var now = DateTime.Now;
            if (conversationInDb == null)
            {
                model.Id = Guid.NewGuid();
                model.CreatedOnDate = now;
            }
            model.LastModifiedOnDate = now;
            model.LastActivityTime = now;

            var newConversation = await _conversation.ReplaceOneAsync(x => x.Id == model.Id, model, new ReplaceOptions { IsUpsert = true });
            return model;
        }

        public async Task<Conversation> SaveLastActivityConversation(Guid conversationId, DateTime lastActivityTime, string lastMessageContent)
        {
            var conversation = await _conversation.Find(x => x.Id == conversationId).FirstOrDefaultAsync();
            if (conversation == null)
                throw new Exception(IChatHubService.ConversationNotFound);

            conversation.LastActivityTime = lastActivityTime;
            conversation.LastMessage = lastMessageContent;
            return await SaveConversation(conversation);
        }

        public async Task<Message> SaveMessage(Message model)
        {
            if (model.Id == Guid.Empty)
            {
                model.Id = Guid.NewGuid();
                model.CreatedOnDate = DateTime.Now;
            }
            model.LastModifiedOnDate = DateTime.Now;
            await _message.ReplaceOneAsync(x => x.Id == model.Id, model, new ReplaceOptions { IsUpsert = true });
            return model;
        }

        public async Task<User> SaveUser(User model)
        {
            model.LastModifiedOnDate = DateTime.Now;
            await _users.ReplaceOneAsync(x => x.Id == model.Id, model, new ReplaceOptions { IsUpsert = true });
            return model;
        }
    }
}

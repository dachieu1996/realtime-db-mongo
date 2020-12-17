using MongoDB.Bson;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Tsoft.ChatService.Hubs.Interfaces;
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

        public async Task<List<ConversationViewModel>> GetConversations(string userId)
        {
            var conversations = await _conversation.Find(c => c.Participants.Contains(userId)).ToListAsync();
            return AutoMapperUtils.AutoMap<Conversation, ConversationViewModel>(conversations);
        }

        public Task<User> GetUserById(string Id)
        {
            throw new NotImplementedException();
        }

        public Task SaveConversation(Conversation model)
        {
            throw new NotImplementedException();
        }

        public async Task<User> SaveUser(User model)
        {
            if (model.Id == null)
            {
                model.CreatedOnDate = DateTime.Now;
                model.LastModifiedOnDate = DateTime.Now;
                await _users.InsertOneAsync(model);
            }
            else
            {
                model.LastModifiedOnDate = DateTime.Now;
                await _users.ReplaceOneAsync(x => x.Id == model.Id, model);
            }
            return model;
        }
    }
}

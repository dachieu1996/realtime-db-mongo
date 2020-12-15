using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Tsoft.ChatService.Models;

namespace Tsoft.ChatService
{
    public class ApplicationUserService
    {
        private readonly IMongoCollection<ApplicationUser> _users;
        private readonly IMongoCollection<Message> _message;

        #region snippet_UserServiceConstructor
        public ApplicationUserService(ChatDatabaseSettings settings)
        {
            var client = new MongoClient(settings.ConnectionString);
            var database = client.GetDatabase(settings.DatabaseName);

            _users = database.GetCollection<ApplicationUser>(settings.UsersCollectionName);
            _message = database.GetCollection<Message>(settings.MessagesCollectionName);
        }
        #endregion
        public ApplicationUser Create(ApplicationUser User)
        {
            _users.InsertOne(User);
            return User;
        }

        public Message Create(Message message)
        {
            _message.InsertOne(message);
            return message;
        }
    }
}

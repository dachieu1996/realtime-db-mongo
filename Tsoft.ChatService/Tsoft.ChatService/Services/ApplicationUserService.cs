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

        #region snippet_UserServiceConstructor
        public ApplicationUserService(ChatDatabaseSettings settings)
        {
            var client = new MongoClient(settings.ConnectionString);
            var database = client.GetDatabase(settings.DatabaseName);

            _users = database.GetCollection<ApplicationUser>(settings.UsersCollectionName);
        }
        #endregion
        public ApplicationUser Create(ApplicationUser User)
        {
            _users.InsertOne(User);
            return User;
        }
    }
}

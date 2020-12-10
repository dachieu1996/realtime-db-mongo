using ChatApi.Models;
using MongoDB.Bson;
using MongoDB.Driver;
using System.Collections.Generic;
using System.Linq;

namespace ChatApi.Services
{
    public class UserService
    {
        private readonly IMongoCollection<User> _users;

        #region snippet_UserServiceConstructor
        public UserService(ChatDatabaseSettings settings)
        {
            var client = new MongoClient(settings.ConnectionString);
            var database = client.GetDatabase(settings.DatabaseName);

            _users = database.GetCollection<User>(settings.UsersCollectionName);
        }
        #endregion

        public List<User> Get()
        {
            return _users.Find(user => true).ToList();
        }
            

        public User Get(string id)
        {
            return _users.Find<User>(User => User.Id == id).FirstOrDefault();
        }

        public User Create(User User)
        {
            _users.InsertOne(User);
            return User;
        }

        public void Update(string id, User UserIn)
        {
            _users.ReplaceOne(User => User.Id == id, UserIn);
        }

        public void Remove(User UserIn)
        {
            _users.DeleteOne(User => User.Id == UserIn.Id);
        }

        public void Remove(string id)
        {
            _users.DeleteOne(User => User.Id == id);
        }
    }
}

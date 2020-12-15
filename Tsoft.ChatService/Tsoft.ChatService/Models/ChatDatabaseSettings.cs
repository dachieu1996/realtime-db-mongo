using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Tsoft.ChatService.Models
{
    public class ChatDatabaseSettings : IChatDatabaseSettings
    {
        public string UsersCollectionName { get; set; }
        public string ConversationsCollectionName { get; set; }
        public string MessagesCollectionName { get; set; }
        public string ConnectionString { get; set; }
        public string DatabaseName { get; set; }
    }

    public interface IChatDatabaseSettings
    {
        string UsersCollectionName { get; set; }
        string ConversationsCollectionName { get; set; }
        string MessagesCollectionName { get; set; }
        string ConnectionString { get; set; }
        string DatabaseName { get; set; }
    }
}

using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Threading.Tasks;

namespace Tsoft.ChatService.Models
{
    public class Conversation
    {
        [BsonId]
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Type { get; set; }
        public string LastMessage { get; set; }
        public string AvatarUrl { get; set; }
        public DateTime? LastActivityTime { get; set; }
        public DateTime? CreatedOnDate { get; set; }
        public DateTime? LastModifiedOnDate { get; set; }
        public ICollection<Guid> Participants { get; set; }
    }

    public static class ConversationType
    {
        public static string PRIVATE = "private";
        public static string GROUP = "group";
    }
}

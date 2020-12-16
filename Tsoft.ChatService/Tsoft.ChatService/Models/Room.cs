using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Threading.Tasks;

namespace Tsoft.ChatService.Models
{
    public class Room
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }
        public string Name { get; set; }
        public string Type { get; set; }
        public string LastMessage { get; set; }
        public DateTime? LastActivityTime { get; set; }
        public ICollection<string> Participants { get; set; }
    }

    public static class RoomType
    {
        public static string PRIVATE = "private";
        public static string GROUP = "group";
    }
}

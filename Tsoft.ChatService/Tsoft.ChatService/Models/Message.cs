using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;

namespace Tsoft.ChatService.Models
{
    public class Message
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }
        public string Content { get; set; }
        public DateTime Timestamp { get; set; }
        public Guid SenderId { get; set; }
        public string ConversationId { get; set; }
    }
}

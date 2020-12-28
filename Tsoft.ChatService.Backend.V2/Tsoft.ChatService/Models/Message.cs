using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;

namespace Tsoft.ChatService.Models
{
    public class Message
    {
        [BsonId]
        public Guid Id { get; set; }
        public string Content { get; set; }
        public DateTime Timestamp { get; set; }
        public Guid SenderId { get; set; }
        public Guid ConversationId { get; set; }
        public DateTime? CreatedOnDate { get; set; }
        public DateTime? LastModifiedOnDate { get; set; }
    }
}

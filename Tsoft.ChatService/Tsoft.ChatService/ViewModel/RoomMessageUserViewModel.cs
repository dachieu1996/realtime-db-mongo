using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Tsoft.ChatService.ViewModel
{
    public class RoomMessageUserViewModel
    {
        public string Id { get; set; }
        public string RoomName { get; set; }
        public List<UserMessage> UserMessage { get; set; }
    }
    public class UserMessage
    {
        public Guid UserId { get; set; }
        public string Name { get; set; }
        public string MessageId { get; set; }
        public string Content { get; set; }
        public DateTime TimeCreated { get; set; }
    }
}

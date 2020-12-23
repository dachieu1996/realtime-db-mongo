using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Tsoft.ChatService.Hubs.Models
{
    public class SendMessageRequestModel
    {
        public string Content { get; set; }
        public Guid ReceiverId { get; set; }
        public Guid ConversationId { get; set; }
    }
}

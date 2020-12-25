using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Tsoft.ChatService.Hubs.Models
{
    public class SendPrivateMessageRequestModel
    {
        public string Content { get; set; }
        public string ConversationId { get; set; }
        public string UserId { get; set; }
    }
}

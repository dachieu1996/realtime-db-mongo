using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Tsoft.ChatService.Models;

namespace Tsoft.ChatService.Hubs.Models
{
    public class SendMessageResponseModel
    {
        public Conversation Conversation { get; set; }
        public Message Message { get; set; }
    }
}

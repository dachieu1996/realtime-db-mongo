using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Tsoft.ChatService.Models;

namespace Tsoft.ChatService.Hubs.Models
{
    public class SendMessageRequestModel
    {
        public string Message { get; set; }
        public Conversation Conversation { get; set; }
    }
}

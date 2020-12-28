using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Tsoft.ChatService.Hubs.Models
{
    public class ConversationRequestModel
    {
        public Guid Id { get; set; }
        public string Type { get; set; }
        public List<Guid> Participants { get; set; }
    }
}

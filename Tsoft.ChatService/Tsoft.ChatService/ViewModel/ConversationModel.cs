using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Tsoft.ChatService.ViewModel
{
    public class ConversationViewModel
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public string Type { get; set; }
        public string LastMessage { get; set; }
        public DateTime? LastActivityTime { get; set; }
        public ICollection<string> Participants { get; set; }
    }
}

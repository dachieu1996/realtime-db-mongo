using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Tsoft.ChatService.Models
{
    public class Room
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public ICollection<string> Participants { get; set; }
    }
}

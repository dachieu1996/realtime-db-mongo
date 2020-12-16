using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Tsoft.ChatService.ViewModel
{
    public class UserViewModel
    {
        public string Id { get; set; }
        public string Username { get; set; }
        public string Fullname { get; set; }
        public string AvatarUrl { get; set; }
        public string CurrentRoom { get; set; }
        public string Device { get; set; }
        public Status Status { get; set; }
    }

    public enum Status
    {
        OFFLINE,
        ONLINE,
        BUSY
    }
}

using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Tsoft.ChatService.Hubs
{
    public class ChatHub : Hub
    {

        public override async Task OnConnectedAsync()
        {
            var context = Context;
        }

    }
}

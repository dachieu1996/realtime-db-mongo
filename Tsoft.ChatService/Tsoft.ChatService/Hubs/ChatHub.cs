using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace Tsoft.ChatService.Hubs
{
    [Authorize]
    public class ChatHub : Hub
    {
        public static List<string> ListUsername { get; set; } = new List<string>();

        public override async Task OnConnectedAsync()
        {
            var context = Context;


            var identity = (ClaimsIdentity)context.User.Identity;

            var user = identity.FindFirst("Username");
            ListUsername.Add(user.Value);
        }

    }
}

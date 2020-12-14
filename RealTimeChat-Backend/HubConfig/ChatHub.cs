using ChatApi.ViewModels;
using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ChatApi.HubConfig
{
    public class ChatHub : Hub
    {
        //public static List<string> connectionId = new List<string>();


        //public readonly static List<UserViewModel> _userConnections = new List<UserViewModel>();

        //public override Task OnConnectedAsync()
        //{
        //    try
        //    {
        //        var user = _context.Users.Where(u => u.UserName == IdentityName).FirstOrDefault();
        //        var userViewModel = _mapper.Map<ApplicationUser, UserViewModel>(user);
        //        //userViewModel.Device = GetDevice();
        //        userViewModel.CurrentRoom = "";

        //        if (!_userConnections.Any(u => u.UserName == IdentityName))
        //        {
        //            _userConnections.Add(userViewModel);
        //            //_ConnectionsMap.Add(IdentityName, Context.ConnectionId);
        //        }

        //        Clients.Caller.SendAsync("getProfileInfo", user.FullName, user.Avatar);
        //    }
        //    catch (Exception ex)
        //    {
        //        Clients.Caller.SendAsync("onError", "OnConnected:" + ex.Message);
        //    }
        //    return base.OnConnectedAsync();
        //}

        //public override Task OnDisconnectedAsync(Exception exception)
        //{
        //    try
        //    {
        //        var user = _Connections.Where(u => u.Username == IdentityName).First();
        //        _Connections.Remove(user);

        //        // Tell other users to remove you from their list
        //        Clients.OthersInGroup(user.CurrentRoom).SendAsync("removeUser", user);

        //        // Remove mapping
        //        _ConnectionsMap.Remove(user.Username);
        //    }
        //    catch (Exception ex)
        //    {
        //        Clients.Caller.SendAsync("onError", "OnDisconnected: " + ex.Message);
        //    }

        //    return base.OnDisconnectedAsync(exception);
        //}

        //public void Dispose()
        //{

        //}
        //public async Task Join(string roomName)
        //{
        //    try
        //    {
        //        var user = _userConnections.Where(u => u.UserName == IdentityName).FirstOrDefault();
        //        if (user != null && user.CurrentRoom != roomName)
        //        {
        //            // Remove user from others list
        //            if (!string.IsNullOrEmpty(user.CurrentRoom))
        //                await Clients.OthersInGroup(user.CurrentRoom).SendAsync("removeUser", user);

        //            // Join to new chat room
        //            await Leave(user.CurrentRoom);
        //            await Groups.AddToGroupAsync(Context.ConnectionId, roomName);
        //            user.CurrentRoom = roomName;

        //            // Tell others to update their list of users
        //            await Clients.OthersInGroup("Join").SendAsync("count", 1);
        //        }
        //    }
        //    catch (Exception ex)
        //    {
        //        await Clients.Caller.SendAsync("onError", "You failed to join the chat room!" + ex.Message);
        //    }
        //}

        //private string IdentityName
        //{
        //    get { return Context.User.Identity.Name; }
        //}

    }
}

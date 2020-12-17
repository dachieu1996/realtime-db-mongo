using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Text.Json;
using System.Threading.Tasks;
using Tsoft.ChatService.Hubs;
using Tsoft.ChatService.Hubs.Interfaces;
using Tsoft.ChatService.Models;
using Tsoft.Framework.Common;
using TSoft.Framework.ApiUtils.Controllers;
using TSoft.Framework.Authentication;

namespace Tsoft.ChatService.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class UserController : ApiControllerBase
    {
        private IUserService _userService;
        private readonly ApplicationUserService _applicationUserService;
        private IChatHub _chatHub;
        private IHubContext<ChatHub> _hub;

        public UserController(IUserService userService, ApplicationUserService applicationUserService, IChatHub chatHub, IHubContext<ChatHub> hub)
        {
            _userService = userService;
            _chatHub = chatHub;
            _hub = hub;
            _applicationUserService = applicationUserService;
        }


        [HttpGet]
        //[AppAuthorize(PermissionTypes.Any, PermissionRule.view_home)]
        public async Task<IActionResult> GetFilterAsync([FromQuery] int currentPage = 1, [FromQuery] int pageSize = 20, [FromQuery] string queryString = "{ }")
        {
            return await ExecuteFunction(async () =>
            {
                var filterObject = JsonSerializer.Deserialize<UserQueryModel>(queryString);
                filterObject.PageSize = pageSize;
                filterObject.CurrentPage = currentPage;

                var result = _userService.GetFilterAsync(filterObject).Result;
                return result;
            });
        }

        [HttpGet("{id}")]
        //[AppAuthorize(PermissionTypes.Any, PermissionRule.view_home)]
        public async Task<IActionResult> Get(Guid id)
        {
            return await ExecuteFunction(async () =>
            {
                return await _userService.GetById(id);
            });
        }

        [HttpGet("get-role/{id}")]
        //[AppAuthorize(PermissionTypes.Any, PermissionRule.view_home)]
        public async Task<IActionResult> GetRole(Guid id)
        {
            return await ExecuteFunction(async () =>
            {
                return await _userService.GetRole(id);
            });
        }

        [HttpPost]
        //[AppAuthorize(PermissionTypes.Any, PermissionRule.view_home)]
        public async Task<IActionResult> Create([FromBody] UserRequestModel request)
        {
            return await ExecuteFunction(async () =>
            {
                var entity = AutoMapperUtils.AutoMap<UserRequestModel, TSoft.Framework.Authentication.User>(request);
                var application = AutoMapperUtils.AutoMap<UserRequestModel, Models.User>(request);
                var result = await _userService.SaveAsync(entity, request.RoleIds, new Guid());
                var appUser = AutoMapperUtils.AutoMap<TSoft.Framework.Authentication.User, Models.User>(result);
                await _chatHub.CreateUser(appUser);
                await _hub.Clients.All.SendAsync(Hubs.Action.ADD_USER, appUser);
                return result;
            });
        }

        [HttpPut("{id}")]
        //[AppAuthorize(PermissionTypes.Any, PermissionRule.view_home)]
        public async Task<IActionResult> Update(Guid id, [FromBody] UserRequestModel request)
        {
            return await ExecuteFunction(async () =>
            {
                var entity = AutoMapperUtils.AutoMap<UserRequestModel, TSoft.Framework.Authentication.User>(request);
                entity.ID = id;
                return await _userService.UpdateAsync(entity, request.RoleIds);
            });
        }

        [HttpPost("add-role")]
        //[AppAuthorize(PermissionTypes.Any, PermissionRule.view_home)]
        public async Task<IActionResult> AddRole(Guid id, [FromBody] List<Guid> roleIds)
        {
            return await ExecuteFunction(async () =>
            {
                return await _userService.AddRole(id, roleIds);
            });
        }
        
    }
}

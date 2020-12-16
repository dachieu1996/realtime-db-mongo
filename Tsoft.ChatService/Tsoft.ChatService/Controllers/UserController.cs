using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Text.Json;
using System.Threading.Tasks;
using Tsoft.ChatService.Hubs;
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
        private readonly IHubContext<ChatHub> _hub;
        private readonly ApplicationUserService _applicationUserService;
        public UserController(IUserService userService, ApplicationUserService applicationUserService, IHubContext<ChatHub> hub)
        {
            _userService = userService;
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
                var entity = AutoMapperUtils.AutoMap<UserRequestModel, User>(request);
                var application = AutoMapperUtils.AutoMap<UserRequestModel, ApplicationUser>(request);
                var result = _applicationUserService.Create(application);
                _hub.Clients.All.SendAsync("adduser", result);
                return await _userService.SaveAsync(entity, request.RoleIds, new Guid());
            });
        }

        [HttpPut("{id}")]
        //[AppAuthorize(PermissionTypes.Any, PermissionRule.view_home)]
        public async Task<IActionResult> Update(Guid id, [FromBody] UserRequestModel request)
        {
            return await ExecuteFunction(async () =>
            {
                var entity = AutoMapperUtils.AutoMap<UserRequestModel, User>(request);
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

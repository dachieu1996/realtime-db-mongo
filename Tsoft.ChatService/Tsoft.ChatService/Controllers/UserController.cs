using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.IO;
using System.Text.Json;
using System.Threading.Tasks;
using Tsoft.ChatService.Hubs;
using Tsoft.ChatService.Hubs.Interfaces;
using Tsoft.ChatService.Models;
using Tsoft.Framework.Common;
using TSoft.Framework.ApiUtils.Controllers;
using TSoft.Framework.Authentication;
using TSoft.Framework.Authentication.Business.Model;

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
        private readonly IHostingEnvironment _environment;
        public UserController(IHostingEnvironment environment,
            IUserService userService, 
            ApplicationUserService applicationUserService, IChatHub chatHub, IHubContext<ChatHub> hub)
        {
            _environment = environment;
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
                var entity = AutoMapperUtils.AutoMap<UserRequestModel, User>(request);
                var application = AutoMapperUtils.AutoMap<UserRequestModel, ApplicationUser>(request);
                var user = await _userService.SaveAsync(entity, request.RoleIds, new Guid());
                var appUser = AutoMapperUtils.AutoMap<User, ApplicationUser>(user);
                await _chatHub.CreateUser(appUser);
                await _hub.Clients.All.SendAsync(Hubs.Action.ADD_USER, appUser);
                return user;
            });
        }

        [HttpPut("{id}")]
        //[AppAuthorize(PermissionTypes.Any, PermissionRule.view_home)]
        public async Task<IActionResult> Update(Guid id, [FromBody] UserRequestModel request)
        {
            return await ExecuteFunction(async () =>
            {
                var entity = AutoMapperUtils.AutoMap<UserRequestModel, User>(request);
                entity.Id = id;
                var result = await _userService.UpdateAsync(entity, request.RoleIds);
                var appUser = AutoMapperUtils.AutoMap<User, ApplicationUser>(result);
       
                //await _hub.Clients.All.SendAsync(Hubs.Action.ADD_USER, appUser);
                return result;
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
        [HttpPut("change-password")]
        //[AppAuthorize(PermissionTypes.Any, PermissionRule.view_home)]
        public async Task<IActionResult> ChangePassword(Guid id, [FromBody] ChangePasswordRequestModel request)
        {
            return await ExecuteFunction(async () =>
            {
                return await _userService.ChangePassword(id, request);
            });
        }

        [HttpPost]
        [Route("UploadFile")]
        public async Task<IActionResult> UploadFile([FromForm] IFormFile files)
        {
            var itemFiles = files;
            var folderName = Path.Combine("assets", "user");
            var pathToSave = Path.Combine("D:\\Chat-SignalR\\Tsoft.ChatService\\wwwroot", folderName);
            var pathSave = Path.Combine(_environment.WebRootPath, folderName);
            if (!Directory.Exists(pathToSave))
                Directory.CreateDirectory(pathToSave);
            if (!Directory.Exists(pathSave))
                Directory.CreateDirectory(pathSave);
            if (itemFiles != null || itemFiles.Length > 0)
            {
                string fileName = Path.GetExtension(itemFiles.FileName);
                string name = itemFiles.FileName;
                string fullPath = Path.Combine(pathToSave, name);
                string fullPath1 = Path.Combine(pathSave, name);
                string dbPath = Path.Combine(folderName, name);

                fullPath = fullPath.Replace("\\", "/");

                using (var stream = new FileStream(fullPath, FileMode.Create))
                {
                    itemFiles.CopyTo(stream);
                    stream.Flush();
                }
                using (var stream = new FileStream(fullPath1, FileMode.Create))
                {
                    itemFiles.CopyTo(stream);
                    stream.Flush();
                }
                return Ok(new { dbPath });
            }
            else
            {
                return BadRequest();
            }
        }
    }
}

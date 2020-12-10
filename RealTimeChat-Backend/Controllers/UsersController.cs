using ChatApi.HubConfig;
using ChatApi.Models;
using ChatApi.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using MongoDB.Bson;
using System.Collections.Generic;

namespace ChatApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IHubContext<ChatHub> _hub;
        private readonly UserService _userService;

        public UsersController(UserService userService, IHubContext<ChatHub> hub)
        {
            _userService = userService;
            _hub = hub;
        }

        [HttpGet]
        public ActionResult<List<User>> Get() =>
            _userService.Get();

        [HttpGet("{id:length(24)}", Name = "GetUser")]
        public ActionResult<User> Get(string id)
        {
            var book = _userService.Get(id);

            if (book == null)
            {
                return NotFound();
            }

            return book;
        }

        [HttpPost]
        public IActionResult Create(User user)
        {
            var result = _userService.Create(user);
            _hub.Clients.All.SendAsync("adduser", result);
            return Ok(result);
        }

        [HttpPut("{id:length(24)}")]
        public IActionResult Update([FromQuery] string id, [FromBody] User userIn)
        {
            var book = _userService.Get(id);

            if (book == null)
            {
                return NotFound();
            }

            _userService.Update(id, userIn);

            return NoContent();
        }

        [HttpDelete("{id:length(24)}")]
        public IActionResult Delete(string id)
        {
            var book = _userService.Get(id);

            if (book == null)
            {
                return NotFound();
            }

            _userService.Remove(book.Id);

            return NoContent();
        }
    }
}

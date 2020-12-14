using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cryptography.KeyDerivation;
using Microsoft.AspNetCore.Mvc;
using TSoft.Framework.ApiUtils.Controllers;
using AutoMapper;
using System.Text.Json;
using TSoft.Framework.ApiUtils.Business.Model;
using TSoft.Framework.Authentication;

namespace TCOM.CRM.Apis.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class AuthenticationController : ApiControllerBase
    {
        private IUserService _userService;

        public AuthenticationController(IUserService userService)
        {
            _userService = userService;
        }

        #region LOGIN
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] AuthenticateRequestModel model)
        {
            return await ExecuteFunction(async () =>
            {
                var response =  _userService.Login(model);
                return await response;
            });
        }

        #endregion LOGIN
    }
}
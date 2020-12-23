using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Tsoft.ChatService.ViewModel
{
    public class CheckCodeViewModel
    {
        public Guid UserId { get; set; }
        public string VerificationCode { get; set; }
    }
}

using Microsoft.AspNetCore.Identity;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Tsoft.ChatService.Models
{
    public class ApplicationUser
    {
        public Guid Id { get; set; }
        public string Fullname { get; set; }
        public string Username { get; set; }
        public string AvatarUrl { get; set; }
        public DateTime? CreatedOnDate { get; set; }
        public DateTime? LastModifiedOnDate { get; set; }
        public Guid? CreatedByUserId { get; set; }
        public Guid? LastModifiedByUserId { get; set; }
    }
}

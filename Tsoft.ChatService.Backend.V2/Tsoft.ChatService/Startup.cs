using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;
using Tsoft.ChatService.Hubs;
using Tsoft.ChatService.Hubs.Interfaces;
using Tsoft.ChatService.Hubs.Services;
using Tsoft.ChatService.Models;
using TSoft.Framework.ApiUtils;
using TSoft.Framework.Authentication;

namespace Tsoft.ChatService
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllers();
            services.AddMvc();

            // Update-Database
            var connectionString = Configuration.GetConnectionString("DefaultConnection");
            services.RegisterChatServiceComponents(Configuration, connectionString);
            services.RegisterCommonServiceComponents(Configuration);
            services.RegisterDbContextBase(Configuration, connectionString);
            services.RegisterSwaggerServiceComponents(Configuration, Assembly.GetExecutingAssembly());

            #region authentication
            var appSettingsSection = Configuration.GetSection("tokens");
            services.RegisterAuthentication(appSettingsSection);
            #endregion authentication
            services.Configure<ChatDatabaseSettings>(
                Configuration.GetSection(nameof(ChatDatabaseSettings)));

            services.AddSingleton<ChatDatabaseSettings>(sp =>
                sp.GetRequiredService<IOptions<ChatDatabaseSettings>>().Value);
            services.AddTransient<IChatHub, ChatHub>();
            services.AddTransient<IChatHubService, ChatHubService>();

            services.AddSingleton<ApplicationUserService>();
            services.AddSignalR();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseCommonConfig();
            app.UseSwaggerConfig(Configuration);

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
                endpoints.MapHub<ChatHub>("/chat-hub");
            });
        }
    }
}

using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Tsoft.ChatService
{
    public static class ChatServiceCollectionExtensions
    {
        public static IServiceCollection RegisterChatServiceComponents(this IServiceCollection services, IConfiguration configuration, string connectionString)
        {
            // services.RegisterCacheComponents(configuration);
            //services.AddDbContext<DataContext>(x => x.UseSqlServer(connectionString, o => o.MigrationsAssembly("TCOM.CRM.DB")));

            //services.AddTransient<IEmployeeService, EmployeeService>();
            //services.AddTransient<ICustomerService, CustomerService>();
            //services.AddTransient<IAddressListService, AddressListService>();
            //services.RegisterSearchServiceComponents(configuration);

            return services;
        }
    }
}

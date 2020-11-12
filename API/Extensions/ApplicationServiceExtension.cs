using Microsoft.Extensions.Configuration;
using API.Data;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using Microsoft.Extensions.DependencyInjection;
using API.Services;
using API.Interfaces;

public static class ApplicationServiceExtension {
    public static IServiceCollection SetApplicationServices
        (this IServiceCollection services, IConfiguration config){
            services.AddScoped<ITokenService, TokenService>();
            services.AddDbContext<DataContext>(options =>
            {
                options.UseSqlite(config.GetConnectionString("DefaultConnection"));
            });
        return services;
    }
}


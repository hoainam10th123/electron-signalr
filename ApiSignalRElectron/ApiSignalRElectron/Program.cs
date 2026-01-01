using ApiSignalRElectron;
var MyAllowSpecificOrigins = "_myAllowSpecificOrigins";
var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
builder.Services.AddCors(options =>
{
    options.AddPolicy(name: MyAllowSpecificOrigins,
                      builder =>
                      {
                          builder.WithOrigins("http://localhost:3000")
                                      .AllowAnyHeader()
                                      .AllowAnyMethod()
                                      .AllowCredentials();
                      });
});
builder.Services.AddSignalR();

var app = builder.Build();

// Configure the HTTP request pipeline.

app.UseAuthorization();

app.UseCors(MyAllowSpecificOrigins);

app.MapControllers();

app.MapHub<ChatHub>("/chatHub");

//app.Use(async (context, next) =>
//{
//    context.Response.Headers.Append(
//        "Content-Security-Policy",
//        "default-src 'self'; " +
//        "connect-src 'self' http://localhost:5165 ws://localhost:5165;"
//    );
//    await next();
//});

app.Run();

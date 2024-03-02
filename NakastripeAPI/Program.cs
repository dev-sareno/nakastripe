using Stripe;
using Stripe.Checkout;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Add Stripe services
builder.Services.AddScoped<ProductService>();
builder.Services.AddScoped<SessionService>();
builder.Services.AddScoped<PriceService>();
builder.Services.AddScoped<SubscriptionService>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.UseCors(b => b.AllowAnyOrigin()
    .AllowAnyHeader()
    .AllowAnyMethod());
app.UseAuthorization();
app.MapControllers();

// Initialize Stripe
StripeConfiguration.ApiKey = "sk_test_*****";

app.Run();
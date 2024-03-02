using Microsoft.AspNetCore.Mvc;
using Nakastripe.DTO;
using Nakastripe.DTO.CreateProduct;
using Stripe;
using Stripe.Checkout;

namespace Nakastripe.Controllers;

[ApiController]
[Route("[controller]")]
public class StripeController : ControllerBase
{
    private readonly ILogger<StripeController> _logger;
    private readonly SessionService _sessionService;
    private readonly PriceService _priceService;
    private readonly ProductService _productService;

    public StripeController(ILogger<StripeController> logger,
        SessionService sessionService,
        PriceService priceService,
        ProductService productService)
    {
        _logger = logger;
        _sessionService = sessionService;
        _priceService = priceService;
        _productService = productService;
    }

    [HttpPost("Product/Create")]
    public async Task<StripeCreateProductResponseDto> CreateProduct(StripeCreateProductRequestDto body)
    {
        var productId = Guid.NewGuid().ToString();

        // Create Stripe Product https://docs.stripe.com/api/products
        var product = await _productService.CreateAsync(new ProductCreateOptions
        {
            Id = productId,
            Name = body.Name,
            Description = body.Description,
            Type = "service",
            Url = $"https://example.com/product/{productId}",
            Images = new List<string>
            {
                "https://picsum.photos/300/300",
                "https://picsum.photos/300/300",
                "https://picsum.photos/300/300",
            },
        });

        // Create Stripe Pricehttps://docs.stripe.com/api/prices
        var price = await _priceService.CreateAsync(new PriceCreateOptions
        {
            Currency = "aud",
            UnitAmount = body.Price,
            Product = product.Id,
            Recurring = new PriceRecurringOptions
            {
                Interval = "month",
                IntervalCount = 1,
            },
        });

        return new StripeCreateProductResponseDto
        {
            ProductId = product.Id,
            PriceId = price.Id,
        };
    }

    [HttpGet("Product")]
    public async Task<StripeList<Product>> GetAllProducts()
    {
        return await _productService.ListAsync();
    }

    [HttpGet("Price")]
    public async Task<StripeList<Price>> GetAllPrices()
    {
        return await _priceService.ListAsync();
    }

    [HttpPost("Session/Create")]
    public async Task<StripeCreateSessionResponseDto> CreateSession(StripeCreateSessionRequestDto body)
    {
        // Create Stripe Session https://docs.stripe.com/api/checkout/sessions
        var session = await _sessionService.CreateAsync(new SessionCreateOptions
        {
            CustomerEmail = body.CustomerEmail,
            ClientReferenceId = body.ReferenceId,
            SuccessUrl = body.SuccessUrl,
            CancelUrl = body.CancelUrl,
            Mode = "subscription",
            LineItems = new List<SessionLineItemOptions>
            {
                new()
                {
                    Price = body.PriceId,
                    Quantity = 1,
                }
            }
        });

        return new StripeCreateSessionResponseDto
        {
            SessionId = session.Id,
            CheckoutUrl = session.Url,
        };
    }
}
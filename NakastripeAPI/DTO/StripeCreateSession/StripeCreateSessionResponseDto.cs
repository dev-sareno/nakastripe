namespace Nakastripe.DTO;

public class StripeCreateSessionResponseDto
{
    public string SessionId { get; set; } = string.Empty;
    public string CheckoutUrl { get; set; } = string.Empty;
}

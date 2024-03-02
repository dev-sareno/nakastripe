namespace Nakastripe.DTO;

public class StripeCreateSessionRequestDto
{
    public string CustomerEmail { get; set; } = String.Empty;
    public string PriceId { get; set; } = String.Empty;
    public string ReferenceId { get; set; } = String.Empty;
    public string SuccessUrl { get; set; } = String.Empty;
    public string CancelUrl { get; set; } = String.Empty;
}

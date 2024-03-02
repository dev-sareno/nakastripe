namespace Nakastripe.DTO.CreateProduct;

public class StripeCreateProductRequestDto
{
    public string Name { get; set; } = String.Empty;
    public string Description { get; set; } = String.Empty;
    public long Price { get; set; }
}
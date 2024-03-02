import React, { useEffect, useState } from "react";
import './PaymentPage.css';
import { Product } from "../../Types/product.type";
import { useParams } from 'react-router-dom';
import { staticProductsData } from "../../Data/products";
import ShoeProduct from "../../Components/ShoeProduct/ShoeProduct";
import { BaseUrl } from "../../Api/api";

const PaymentPage = () => {
  const [product, setProduct] = useState<Product | undefined>();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      setProduct(staticProductsData.find(p => p.id === id));
    }
  }, [id]);

  const buyClickHandler = async () => {
    const registrationId = '2d43b807-4060-47e0-8a0d-e174c1b16170';
    const recurringPaymentId = 'price_1OpsVFAiY5RMymXtGvHNAw6O';
    const response = await fetch(`${BaseUrl}/Stripe/Session`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        customerEmail: 'john.doe@example.com',
        priceId: recurringPaymentId,
        referenceId: registrationId,
        successUrl: `http://localhost:3000/callback/payment/success?ref=${registrationId}`,
        cancelUrl: `http://localhost:3000/callback/payment/cancelled?ref=${registrationId}`,
      }),
    });
    const data = await response.json();
    console.log({ data });
    window.location.href = data.checkoutUrl;
  };

  return (
    <div className="payment">
      <h3>Payment</h3>

      Review product
      {product && (
        <ShoeProduct
          id={product.id}
          name={product.name}
          description={product.description}
          price={product.price} />
      )}

      <button onClick={() => buyClickHandler()}>Proceed to payment</button>
    </div>
  );
};

export default PaymentPage;

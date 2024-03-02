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
    const response = await fetch(`${BaseUrl}/Stripe/CreateSession`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        customerEmail: 'john.doe@example.com',
        price: product!.price
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

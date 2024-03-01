import React, { useEffect, useState } from "react";
import './PaymentPage.css';
import { Product } from "../../Types/product.type";
import { useParams } from 'react-router-dom';
import { staticProductsData } from "../../Data/products";
import ShoeProduct from "../../Components/ShoeProduct/ShoeProduct";

const PaymentPage = () => {
  const [product, setProduct] = useState<Product | undefined>();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      setProduct(staticProductsData.find(p => p.id === id));
    }
  }, [id]);

  const buyClickHandler = () => {};

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

import React, { useState } from "react";
import './ProductsPage.css';
import ShoeProduct from "../../Components/ShoeProduct/ShoeProduct";
import { Product } from "../../Types/product.type";
import { useNavigate } from "react-router-dom";
import { staticProductsData } from "../../Data/products";

const ProductsPage = () => {
  const [products] = useState<Product[]>(staticProductsData);

  const navigate = useNavigate();

  const productClickHandler = (id: string) => {
    navigate(`/payment/${id}`);
  };

  return (
    <div className="products">
      <h3>Products</h3>
      <div className="row">
        {products.map((product, i) => (
          <ShoeProduct key={i}
            id={product.id}
            name={product.name}
            description={product.description}
            price={product.price}
            onClick={() => productClickHandler(product.id)} />
        ))}
      </div>
    </div>
  );
};

export default ProductsPage;

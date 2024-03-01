import React from "react";
import './ShoeProduct.css';

interface Props {
  id: string;
  name: string;
  description: string;
  price: number;
  onClick?: (id: string) => void;
}

const ShoeProduct = (props: Props) => {
  const clickHandler = () => {
    props.onClick && props.onClick(props.id);
  };

  return (
    <div className="shoe-product col" onClick={() => clickHandler()}>
      <div><b>Name:</b> {props.name}</div>
      <div><b>Price:</b> {props.price}</div>
      <div><b>Description:</b> {props.description}</div>
    </div>
  );
};

export default ShoeProduct;

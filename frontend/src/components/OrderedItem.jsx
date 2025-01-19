import React from "react";
import { useParams } from "react-router-dom";
import "../stylesheets/OrderedItem.css";

const OrderedItem = ({
  name,
  price,
  img,
  orderedQuantity,
  priceForProduct,
}) => {
  return (
    <div className="outlined">
      <div className="cart-item-div">
        <div className="cart-item-photo-div">
          <img src={img} />
        </div>
        <div className="cart-item-info">
          <p id="fruit-name">{name}</p>

          <p>{price} zł</p>
        </div>
        <div className="cart-item-quantity">
          <p>{orderedQuantity}</p>
        </div>
      </div>
      <div className="ordered-item-down-div">
        <p className="ordered-item-down-text">
          TOTAL FOR PRODUCT: {priceForProduct} zł
        </p>
      </div>
    </div>
  );
};

export default OrderedItem;

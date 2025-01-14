import React from "react";
import { calculateFruitTotalPrice, removeFruitFromCart } from "../js/CartUtils";
import "../stylesheets/CartItem.css";

const CartItem = ({ fruit, onRemove }) => {
  const handleRemove = () => {
    removeFruitFromCart(fruit.name);
    onRemove(fruit.name);
  };

  return (
    <div className="outlined">
      <div className="cart-item-div">
        <div className="cart-item-photo-div">
          <img src={fruit.img} alt={fruit.name} />
        </div>
        <div className="cart-item-info">
          <p id="fruit-name">{fruit.name}</p>

          <p>Price: {fruit.price} zł</p>
          <p>Total: {calculateFruitTotalPrice(fruit)} zł</p>
        </div>
        <div className="cart-item-quantity">
          <p>{fruit.orderedQuantity}</p>
        </div>
      </div>
      <div className="cart-down-btn-div">
        <button className="btn" onClick={handleRemove}>
          <p>REMOVE</p>
        </button>
      </div>
    </div>
  );
};

export default CartItem;

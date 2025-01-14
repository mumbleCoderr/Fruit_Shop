import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUserRole } from "../js/Auth";
import {
  createFruitObjectFromCart,
  calculateTotalPrice,
} from "../js/CartUtils";
import CartItem from "./CartItem";
import "../stylesheets/Cart.css";

const Cart = () => {
  const navigate = useNavigate();
  const userRole = getUserRole();
  const [fruits, setFruits] = useState({});

  useEffect(() => {
    const fruitData = createFruitObjectFromCart();
    setFruits(fruitData);
  }, []);

  useEffect(() => {
    if (userRole === "ROLE_ADMIN" || userRole === null) {
      navigate("/");
    }
  }, [userRole, navigate]);

  const handleRemove = (fruitName) => {
    const updatedFruits = { ...fruits };
    delete updatedFruits[fruitName];
    setFruits(updatedFruits);
  };

  const totalPrice = calculateTotalPrice();

  const handleOrderClick = () => {
    if (!localStorage.getItem("totalPrice")) {
      localStorage.setItem("totalPrice", totalPrice.toString());
    }

    navigate("/Address");
  };

  return (
    <>
      <h1>SHOPPING CART</h1>
      <div className="cart-container">
        {Object.values(fruits).map((fruit) => (
          <CartItem key={fruit.name} fruit={fruit} onRemove={handleRemove} />
        ))}
      </div>
      <div className="order-div">
        <div className="total-summary-div">
          <p className="total-sumamry-text">TOTAL SUMMARY:</p>
          <p className="total-price-info">{totalPrice} zł</p>
        </div>
        <div className="order-btn-div">
          <button className="btn" onClick={handleOrderClick}>
            <p>ORDER</p>
          </button>
        </div>
      </div>
    </>
  );
};

export default Cart;

import React, { useEffect } from "react";
import OrderHistoryItemInfo from "./OrderHistoryItemInfo";
import { useNavigate } from "react-router-dom";
import { getUserRole } from "../js/Auth";
import "../stylesheets/OrderHistoryItem.css";

const OrderHistoryItem = ({ order }) => {
  const navigate = useNavigate();
  const userRole = getUserRole();
  const formattedDate = new Date(order.date).toLocaleString();

  useEffect(() => {
    if (!userRole || userRole === "ROLE_ADMIN") {
      navigate("/");
    }
  }, [userRole, navigate]);

  const handleShowClick = () => {
    navigate(`/order-history-item/${order.id}`);
  };

  return (
    <div className="outlined">
      <div className="order-item">
        <div className="order-item-left-div">
          <p className="order-item-text">DATE:</p>
          <p className="order-item-text">{formattedDate}</p>
        </div>
        <div className="order-item-right-div">
          <p className="order-item-text">TOTAL:</p>
          <p className="order-item-text">{order.totalSummary} zł</p>
        </div>
      </div>
      <div className="cart-down-btn-div">
        <button className="btn" onClick={handleShowClick}>
          <p>SHOW DETAILS</p>
        </button>
      </div>
    </div>
  );
};

export default OrderHistoryItem;

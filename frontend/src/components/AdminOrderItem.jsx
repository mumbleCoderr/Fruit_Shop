import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getUserRole } from "../js/Auth";

const AdminOrderItem = ({ order }) => {
  const { id, date, totalSummary, orderedProducts } = order;
  const userRole = getUserRole();
  const navigate = useNavigate();
  const formattedDate = new Date(order.date).toLocaleString();

  useEffect(() => {
    if (userRole !== "ROLE_ADMIN") {
      navigate("/");
    }
  }, [userRole, navigate]);

  const handleShowDetails = () => {
    navigate(`/order-info/${id}`);
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
          <p className="order-item-text">{totalSummary} zł</p>
        </div>
      </div>
      <div className="cart-down-btn-div">
        <button className="btn" onClick={handleShowDetails}>
          <p>SHOW DETAILS</p>
        </button>
      </div>
    </div>
  );
};

export default AdminOrderItem;

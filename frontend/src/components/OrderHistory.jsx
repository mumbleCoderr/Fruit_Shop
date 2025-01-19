import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUserRole } from "../js/Auth";
import OrderHistoryItem from "./OrderHistoryItem";

const OrderHistory = () => {
  const navigate = useNavigate();
  const userRole = getUserRole();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (!userRole || userRole === "ROLE_ADMIN") {
      navigate("/");
    }
  }, [userRole, navigate]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("jwtToken");
        const response = await fetch(
          "http://localhost:8080/order/user/getallorders",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch orders");
        }

        const data = await response.json();
        setOrders(data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <>
      <h1>ORDER HISTORY</h1>
      <div className="cart-container">
        {orders.map((order) => (
          <OrderHistoryItem key={order.id} order={order} />
        ))}
      </div>
    </>
  );
};

export default OrderHistory;

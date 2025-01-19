import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUserRole } from "../js/Auth";
import AdminOrderItem from "./AdminOrderItem";

const AdminOrders = () => {
  const navigate = useNavigate();
  const userRole = getUserRole();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (userRole !== "ROLE_ADMIN") {
      navigate("/");
    }
  }, [userRole, navigate]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("jwtToken");
        const response = await fetch(
          "http://localhost:8080/order/admin/getallorders",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch admin orders");
        }

        const data = await response.json();
        setOrders(data);
      } catch (error) {
        console.error("Error fetching admin orders:", error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <>
      <h1>ORDERS</h1>
      <div className="cart-container">
        {orders.length > 0 ? (
          orders.map((order) => <AdminOrderItem key={order.id} order={order} />)
        ) : (
          <p>No orders available</p>
        )}
      </div>
    </>
  );
};

export default AdminOrders;

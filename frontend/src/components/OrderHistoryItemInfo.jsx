import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import OrderedItem from "./OrderedItem";
import "../stylesheets/OrderHistoryItemInfo.css";

const OrderHistoryItemInfo = () => {
  const { id } = useParams();
  const [orderDetails, setOrderDetails] = useState(null);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const token = localStorage.getItem("jwtToken");
        const response = await fetch(
          `http://localhost:8080/order/user/get/${id}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        setOrderDetails(data);
      } catch (error) {
        console.error("Error fetching order details:", error);
      }
    };

    fetchOrderDetails();
  }, [id]);

  return (
    <>
      <h1>ORDER DETAILS</h1>
      <div className="cart-container">
        {orderDetails &&
          orderDetails.map((product, index) => (
            <OrderedItem
              key={index}
              name={product.name}
              price={product.price}
              img={product.img}
              orderedQuantity={product.orderedQuantity}
              priceForProduct={product.priceForProduct}
            />
          ))}
      </div>
    </>
  );
};

export default OrderHistoryItemInfo;

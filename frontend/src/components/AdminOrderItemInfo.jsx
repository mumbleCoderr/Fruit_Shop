import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import OrderedItem from "./OrderedItem";
import "../stylesheets/OrderHistoryItemInfo.css";
import OrderAddress from "./OrderAddress";

const AdminOrderItemInfo = () => {
  const { id } = useParams();
  const [orderDetails, setOrderDetails] = useState(null);
  const [addressDetails, setAddressDetails] = useState(null);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const token = localStorage.getItem("jwtToken");
        const response = await fetch(
          `http://localhost:8080/order/admin/get/${id}`,
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

    const fetchAddressDetails = async () => {
      try {
        const token = localStorage.getItem("jwtToken");
        const response = await fetch(
          `http://localhost:8080/order/admin/getorderaddress/${id}`,
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

        const addressData = await response.json();
        setAddressDetails(addressData);
      } catch (error) {
        console.error("Error fetching address details:", error);
      }
    };

    fetchOrderDetails();
    fetchAddressDetails();
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

      <div className="cart-container">
        {addressDetails && (
          <OrderAddress
            userName={addressDetails.userName}
            addressLine={addressDetails.addressLine}
            addressLine2={addressDetails.addressLine2}
            zipCode={addressDetails.zipCode}
            city={addressDetails.city}
            country={addressDetails.country}
          />
        )}
      </div>
    </>
  );
};

export default AdminOrderItemInfo;

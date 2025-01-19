import React from "react";
import "../stylesheets/OrderAddress.css";

const OrderAddress = ({
  userName,
  addressLine,
  addressLine2,
  zipCode,
  city,
  country,
}) => {
  return (
    <div className="outlined">
      <div className="order-address-item">
        <div className="order-address-left-div">
          <p className="order-address-item-text" id="order-address-item-title">
            ADDRESS:
          </p>
          <p className="order-address-item-text">{addressLine}</p>
          <p className="order-address-item-text">{addressLine2}</p>
          <p className="order-address-item-text">{zipCode}</p>
          <p className="order-address-item-text">{city}</p>
          <p className="order-address-item-text">{country}</p>
        </div>
        <div className="order-address-right-div">
          <p className="order-address-item-text" id="order-address-item-title">
            USERNAME:
          </p>
          <p className="order-address-item-text">{userName}</p>
        </div>
      </div>
    </div>
  );
};

export default OrderAddress;

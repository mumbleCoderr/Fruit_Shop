import React, { useState } from "react";
import "../stylesheets/Address.css";
import { useNavigate } from "react-router-dom";
import { createFruitToSend } from "../js/cartUtils";

const Address = () => {
  const [formData, setFormData] = useState({
    addressLine: "",
    addressLine2: "",
    zipCode: "",
    city: "",
    country: "",
  });

  const [error, setError] = useState("");
  const [shake, setShake] = useState(false);
  const [addressId, setAddressId] = useState(null);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const validateForm = () => {
    return (
      formData.addressLine.trim() &&
      formData.zipCode.trim() &&
      formData.city.trim() &&
      formData.country.trim()
    );
  };

  const handleOrderCall = async (id) => {
    try {
      const token = localStorage.getItem("jwtToken");
      const formattedCart = createFruitToSend();
      const response = await fetch(
        `http://localhost:8080/order/user/setorder/${id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formattedCart),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to set order.");
      }

      localStorage.setItem("cart", JSON.stringify({}));
      navigate("/OrderOk");
    } catch (error) {
      console.error("Error:", error);
      setError("Failed to set the order. Please try again.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      setShake(true);
      setTimeout(() => setShake(false), 500);
      setError("All fields except Address Line 2 are required.");
      return;
    }

    try {
      const token = localStorage.getItem("jwtToken");
      const response = await fetch(
        "http://localhost:8080/order/user/setaddress",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to submit address.");
      }

      const addressId = await response.json();
      setAddressId(addressId);

      await handleOrderCall(addressId);

      setAddressId(null);
      setError("");
      setFormData({
        addressLine: "",
        addressLine2: "",
        zipCode: "",
        city: "",
        country: "",
      });
    } catch (error) {
      console.error("Error:", error);
      setError("Failed to submit the address. Please try again.");
    }
  };

  return (
    <>
      <h1>
        SHIPMENT
        <br />
        <span>ADDRESS</span>
      </h1>
      <div className={`address-container ${shake ? "shake" : ""}`}>
        <div className="left-address-div">
          <form onSubmit={handleSubmit}>
            <div className={`input-div ${shake ? "input-div-error" : ""}`}>
              <input
                type="text"
                name="addressLine"
                value={formData.addressLine}
                onChange={handleChange}
                placeholder="Address Line"
              />
              <input
                type="text"
                name="addressLine2"
                value={formData.addressLine2}
                onChange={handleChange}
                placeholder="Address Line 2 (optional)"
              />
              <input
                type="text"
                name="zipCode"
                value={formData.zipCode}
                onChange={handleChange}
                placeholder="zipCode"
              />
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                placeholder="City"
              />
              <input
                type="text"
                name="country"
                value={formData.country}
                onChange={handleChange}
                placeholder="Country"
              />
            </div>
          </form>
          {error && <p className="error-message">{error}</p>}
        </div>
        <div className="right-address-div">
          <button
            className={`btn ${error ? "btn-error" : ""}`}
            onClick={handleSubmit}
          >
            <p className="btn-text">SUBMIT</p>
          </button>
        </div>
      </div>
    </>
  );
};

export default Address;

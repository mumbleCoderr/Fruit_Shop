import React, { useState } from "react";
import "../stylesheets/Address.css";

const Address = () => {
  const [formData, setFormData] = useState({
    addressLine: "",
    addressLine2: "",
    zipcode: "",
    city: "",
    country: "",
  });

  const [error, setError] = useState("");
  const [shake, setShake] = useState(false);

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
      formData.zipcode.trim() &&
      formData.city.trim() &&
      formData.country.trim()
    );
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
      const response = await fetch(
        "http://localhost:8080/product/users/order",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to submit address.");
      }

      setError("");
      setFormData({
        addressLine: "",
        addressLine2: "",
        zipcode: "",
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
                name="zipcode"
                value={formData.zipcode}
                onChange={handleChange}
                placeholder="Zipcode"
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
            type="submit"
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

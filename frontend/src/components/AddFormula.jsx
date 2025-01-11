import "../stylesheets/AddFormula.css";
import React, { useState } from "react";

const AddFormula = () => {
  const [error, setError] = useState("");
  const [shake, setShake] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    quantity: "",
    img: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateForm = () => {
    return (
      formData.name.trim() &&
      formData.price &&
      formData.quantity &&
      formData.img.trim()
    );
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      setShake(true);
      setTimeout(() => setShake(false), 500);
      setError("All fields are required.");
      return;
    }

    try {
      const token = localStorage.getItem("jwtToken");
      const response = await fetch("http://localhost:8080/product/admin/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log("Product added successfully!");
        setFormData({ name: "", price: "", quantity: "", img: "" });
        setIsExpanded(false);
        setError("");
        setShake(false);
      } else {
        console.error("Failed to add product.");
        setError("Failed to add product. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      setError("An error occurred. Please try again.");
    }
  };

  const click = () => {
    setIsExpanded((prev) => !prev);
  };

  const handleFormClick = (e) => {
    e.stopPropagation();
  };

  return (
    <>
      <div
        className={`add-div ${isExpanded ? "expanded" : ""} ${
          shake ? "shake" : ""
        }`}
        onClick={click}
      >
        {isExpanded ? (
          <form onClick={handleFormClick}>
            <div
              className={`input-div ${error ? "input-div-error shake" : ""}`}
            >
              <input
                type="text"
                name="name"
                required
                placeholder="name"
                value={formData.name}
                onChange={handleChange}
              />
              <input
                type="number"
                name="price"
                step="0.1"
                required
                placeholder="price"
                value={formData.price}
                onChange={handleChange}
              />
              <input
                type="number"
                name="quantity"
                required
                placeholder="quantity"
                value={formData.quantity}
                onChange={handleChange}
              />
              <input
                type="text"
                name="img"
                required
                placeholder="img"
                value={formData.img}
                onChange={handleChange}
              />
            </div>
            <div className="button-div">
              <button
                type="button"
                className={error ? "btn-error" : "btn"}
                onClick={handleSubmit}
              >
                <p className="btn-text">SAVE</p>
              </button>
            </div>
          </form>
        ) : (
          <p id="add-title">ADD A PRODUCT</p>
        )}
      </div>

      {error && <p className="error-message">{error}</p>}
    </>
  );
};

export default AddFormula;

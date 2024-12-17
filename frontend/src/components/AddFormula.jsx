import "../stylesheets/AddFormula.css";
import React, { useState } from "react";

const AddFormula = ({ setFruits }) => {
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
      const response = await fetch("http://localhost:8080/api/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const newProduct = await response.json();
        setFruits((prevFruits) => [...prevFruits, newProduct]);
        console.log("Product added successfully!");
        setFormData({ name: "", price: "", quantity: "", img: "" });
        setIsExpanded(false);
        setError("");
        setShake(false);
      } else {
        console.error("Failed to add product.");
      }
    } catch (error) {
      console.error("Error:", error);
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
          <p id="add-title">Click to add a product</p>
        )}
      </div>

      {error && <p className="error-message">{error}</p>}
    </>
  );
};

export default AddFormula;

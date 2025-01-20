import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../stylesheets/SignUp.css";

const SignUp = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    password2: "",
    name: "",
    surname: "",
    phone_number: "",
  });

  const [error, setError] = useState(false);
  const [shake, setShake] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const phoneRegex = /^[\d\s\+]+$/;

    if (
      !formData.username.trim() ||
      !formData.password.trim() ||
      !formData.password2.trim() ||
      !formData.name.trim() ||
      !formData.surname.trim() ||
      !formData.phone_number.trim()
    ) {
      setErrorMessage("All fields are required.");
      return false;
    }

    if (formData.password.length < 10) {
      setErrorMessage("Password must be at least 10 characters long.");
      return false;
    }

    if (formData.password !== formData.password2) {
      setErrorMessage("Passwords do not match.");
      return false;
    }

    if (!phoneRegex.test(formData.phone_number)) {
      setErrorMessage("This is not a valid phone number.");
      return false;
    }

    if (
      formData.phone_number.indexOf("+") !==
      formData.phone_number.lastIndexOf("+")
    ) {
      setErrorMessage("This is not a valid phone number.");
      return false;
    }

    if (formData.phone_number.length > 20) {
      setErrorMessage("Phone number cannot exceed 20 characters.");
      return false;
    }

    setErrorMessage("");
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      setError(true);
      setShake(true);
      setTimeout(() => setShake(false), 500);
      return;
    }

    setError(false);

    try {
      const response = await fetch("http://localhost:8080/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: formData.username,
          password: formData.password,
          name: formData.name,
          surname: formData.surname,
          phoneNumber: formData.phone_number,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to sign up");
      }

      const data = await response.json();
      setSuccessMessage("Sign up successful!");
      alert("Sign up successful!");
      console.log("Response from server:", data);

      setFormData({
        username: "",
        password: "",
        password2: "",
        name: "",
        surname: "",
        phone_number: "",
      });

      navigate("/LogIn");
    } catch (err) {
      setError(true);
      setErrorMessage(err.message);
      console.error("Error:", err);
    }
  };

  return (
    <div className="container">
      <h2>SIGN UP</h2>
      <div className={`formula-div ${shake ? "shake" : ""}`}>
        <div className="login-div">
          <form onSubmit={handleSubmit} className="profile-form">
            <input
              type="text"
              id="username"
              name="username"
              placeholder="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
            <input
              type="password"
              id="password"
              name="password"
              placeholder="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <input
              type="password"
              id="password2"
              name="password2"
              placeholder="password again"
              value={formData.password2}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              id="name"
              name="name"
              placeholder="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              id="surname"
              name="surname"
              placeholder="surname"
              value={formData.surname}
              onChange={handleChange}
              required
            />
            <input
              type="tel"
              id="phone_number"
              name="phone_number"
              placeholder="phone number"
              value={formData.phone_number}
              onChange={handleChange}
              required
            />
          </form>
        </div>
        <div className="button-div">
          <button
            type="button"
            className={`btn ${error ? "btn-error" : ""}`}
            onClick={handleSubmit}
          >
            <p className="btn-text">SIGN UP</p>
          </button>
        </div>
      </div>
      {error && <p className="error-message">{errorMessage}</p>}
      {!error && successMessage && (
        <p className="success-message">{successMessage}</p>
      )}
    </div>
  );
};

export default SignUp;

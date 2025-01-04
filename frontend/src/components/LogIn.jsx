import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Importujemy useNavigate
import "../stylesheets/LogIn.css";

const LogIn = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState(false);
  const [shake, setShake] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate(); // Hook nawigacyjny do zmiany strony

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    if (!formData.username.trim() || !formData.password.trim()) {
      setErrorMessage("All fields are required.");
      return false;
    }

    setErrorMessage("");
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) {
      setError(true);
      setShake(true);
      setTimeout(() => setShake(false), 500);
      return;
    }
    setError(false);
    console.log("Form submitted:", formData);
    // DODAJ API CALL NA /login
  };

  // Funkcja obsługująca kliknięcie przycisku SIGN UP
  const handleSignUpRedirect = () => {
    navigate("/SignUp"); // Przechodzi do strony /SignUp
  };

  return (
    <div className="container">
      <h2 id="login-text">LOG IN</h2>
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
          </form>
        </div>
        <div className="button-div">
          <button
            type="button"
            className={`btn ${error ? "btn-error" : ""}`}
            onClick={handleSubmit}
          >
            <p className="btn-text">LOG IN</p>
          </button>
        </div>
      </div>
      <div className="button-div">
        <button
          id="sign-up-btn"
          className="btn"
          type="button"
          onClick={handleSignUpRedirect}
        >
          <p className="btn-text">SIGN UP</p>
        </button>
      </div>
      {error && <p className="error-message">{errorMessage}</p>}
    </div>
  );
};

export default LogIn;

import React from "react";
import { useNavigate } from "react-router-dom";
import "../stylesheets/NotFound.css";

const NotFound = () => {
  const navigate = useNavigate();

  const handleReturnShop = () => {
    navigate("/");
  };

  return (
    <div className="notfound-div">
      <div className="notfound-left-div">
        <h1 className="notfound-header">404 - Page Not Found</h1>
        <p className="notfound-p">
          Sorry, the product you're looking for does not exist.
        </p>
      </div>
      <div className="notfound-right-div">
        <button className="notfound-return-btn" onClick={handleReturnShop}>
          return shop
        </button>
      </div>
    </div>
  );
};

export default NotFound;

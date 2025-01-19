import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../stylesheets/OrderOk.css";

const OrderOk = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/");
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="order-ok-container">
      <h1>
        THANK YOU
        <br />
        <span>FOR YOUR ORDER</span>
      </h1>
      <div className="order-ok-div">
        <p className="order-ok-text">
          You will be redirected
          <br />
          to the homepage in 5 seconds...
        </p>
        <div className="loader"></div>
      </div>
    </div>
  );
};

export default OrderOk;

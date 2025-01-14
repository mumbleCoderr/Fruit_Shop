import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../stylesheets/TopBar.css";
import { getUserRole } from "../js/Auth";

const TopBar = () => {
  const navigate = useNavigate();

  const handleAccountClick = () => {
    const userRole = getUserRole();

    if (userRole === "ROLE_ADMIN" || userRole === "ROLE_USER") {
      navigate("/Profile");
    } else {
      navigate("/LogIn");
    }
  };

  const userRole = getUserRole();

  const handleCartClick = () => {
    if (userRole === null) {
      navigate("/LogIn");
    } else {
      navigate("/Cart");
    }
  };

  return (
    <div className="top-div">
      <h2 className="title">fruit shop</h2>
      <div className="right-div">
        <Link to="/">
          <span className="material-icons md-48" title="go to the home page">
            home
          </span>
        </Link>

        <span
          className="material-icons md-48"
          title="go to profile options"
          id="profile-icon"
          onClick={handleAccountClick}
        >
          account_circle
        </span>

        {userRole !== "ROLE_ADMIN" && (
          <span
            className="material-icons md-48"
            title="go to the shopping cart"
            onClick={handleCartClick}
          >
            shopping_cart
          </span>
        )}
      </div>
    </div>
  );
};

export default TopBar;

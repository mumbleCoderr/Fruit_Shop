import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../stylesheets/TopBar.css";
import { getUserRole } from "../js/Auth"; // Załóżmy, że masz funkcję getUserRole()

const TopBar = () => {
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const navigate = useNavigate(); // Hook do nawigacji

  // Funkcja, która obsługuje kliknięcie na ikonę konta
  const handleAccountClick = () => {
    const userRole = getUserRole();

    if (userRole === "ROLE_ADMIN" || userRole === "ROLE_USER") {
      navigate("/Profile"); // Jeśli rola to admin lub user, przejdź do /Profile
    } else {
      navigate("/LogIn"); // Jeśli brak roli lub inna, przejdź do /LogIn
    }
  };

  const toggleSearchBar = () => {
    setIsSearchVisible(!isSearchVisible);
  };

  return (
    <div className="top-div">
      <h2 className="title">fruit shop</h2>
      <div className="right-div">
        <span
          className="material-icons md-48"
          title="open a search bar"
          onClick={toggleSearchBar}
        >
          search
        </span>

        {isSearchVisible && (
          <input
            className="searchbar"
            type="text"
            name="search"
            placeholder="search for a product"
          />
        )}

        <Link to="/">
          <span className="material-icons md-48" title="go to the home page">
            home
          </span>
        </Link>

        {/* Przekierowanie do /Profile w zależności od roli */}
        <span
          className="material-icons md-48"
          title="go to profile options"
          id="profile-icon"
          onClick={handleAccountClick} // Funkcja odpowiedzialna za przekierowanie
        >
          account_circle
        </span>

        <Link to="/ShoppingCart">
          <span
            className="material-icons md-48"
            title="go to the shopping cart"
          >
            shopping_cart
          </span>
        </Link>
      </div>
    </div>
  );
};

export default TopBar;

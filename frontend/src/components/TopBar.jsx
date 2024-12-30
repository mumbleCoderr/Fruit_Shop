import React, { useState } from "react";
import "../stylesheets/TopBar.css";

const TopBar = () => {
  const [isSearchVisible, setIsSearchVisible] = useState(false);

  const toggleSearchBar = () => {
    setIsSearchVisible(!isSearchVisible);
  };

  {
    /* 
              dodac link do komponentow, 
              dodawania do koszyka,
              rozwijanie menu koszyka, 
              rozwijanie menu profilu,
              wyszukiwanie produktow,
              sortowanie produktow,
                      I
                      V
              logowanie itp
          */
  }

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

        <span
          className="material-icons md-48"
          title="sort products by alphabetical"
        >
          sort
        </span>
        <span className="material-icons md-48" title="go to profile options">
          account_circle
        </span>
        <span className="material-icons md-48" title="go to the shopping cart">
          shopping_cart
        </span>
      </div>
    </div>
  );
};

export default TopBar;

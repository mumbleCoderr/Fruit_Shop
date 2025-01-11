import React, { useState } from "react";
import AddFormula from "./AddFormula";
import ListItems from "./ListItems";
import "../stylesheets/AdminPanel.css";

const AdminPanel = () => {
  const [showListItems, setShowListItems] = useState(false);

  const toggleListItems = () => {
    setShowListItems(!showListItems);
  };

  return (
    <>
      <div className="item-list-container">
        <h1 id="admin-panel-header">Admin Panel</h1>
        <AddFormula />

        <div className="add-div" onClick={toggleListItems}>
          <p id="add-title">
            {showListItems ? "HIDE PRODUCTS" : "SHOW PRODUCTS"}
          </p>
        </div>
      </div>
      {showListItems && <ListItems />}
    </>
  );
};

export default AdminPanel;

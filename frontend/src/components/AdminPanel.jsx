import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AddFormula from "./AddFormula";
import { getUserRole } from "../js/Auth";
import ListItems from "./ListItems";
import "../stylesheets/AdminPanel.css";

const AdminPanel = () => {
  const [showListItems, setShowListItems] = useState(false);
  const userRole = getUserRole();
  const navigate = useNavigate();

  useEffect(() => {
    if (!userRole || userRole === "ROLE_USER") {
      navigate("/");
    }
  }, [userRole, navigate]);

  const toggleListItems = () => {
    setShowListItems(!showListItems);
  };

  const handleShowOrders = () => {
    navigate("/AdminOrders");
  };

  return (
    <>
      <div className="item-list-container">
        <h1 id="admin-panel-header">ADMIN PANEL</h1>
        <AddFormula />

        <div className="add-div" onClick={toggleListItems}>
          <p id="add-title">
            {showListItems ? "HIDE PRODUCTS" : "SHOW PRODUCTS"}
          </p>
        </div>
        <div className="add-div" onClick={handleShowOrders}>
          <p id="add-title">SHOW ORDERS</p>
        </div>
      </div>
      {showListItems && <ListItems />}
    </>
  );
};

export default AdminPanel;

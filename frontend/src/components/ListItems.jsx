import Item from "./Item";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "../stylesheets/ListItem.css";
import { getUserRole } from "../js/Auth";

const ListItems = () => {
  const [fruits, setFruits] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFruits = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/product/noauthority/getall"
        );
        setFruits(response.data);
      } catch (err) {
        setError(err.message);
        navigate("/NotFound");
      }
    };

    fetchFruits();
  }, []);

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  const userRole = getUserRole();

  return (
    <>
      {userRole !== "ROLE_ADMIN" && (
        <h1>
          CHOOSE YOUR
          <br />
          <span>FRUIT</span>
        </h1>
      )}

      <div className="item-list-container">
        <ul>
          {fruits.map((fruit) => (
            <Link key={fruit.id} to={`/product/${fruit.id}`}>
              <Item fruit={fruit} />
            </Link>
          ))}
        </ul>
      </div>
    </>
  );
};

export default ListItems;

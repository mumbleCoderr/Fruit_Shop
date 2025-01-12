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
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFruits = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/product/noauthority/getall/${page}`
        );
        setFruits(response.data);
      } catch (err) {
        setError(err.message);
        navigate("/NotFound");
      }
    };

    fetchFruits();
  }, [page]);

  useEffect(() => {
    const fetchTotalPages = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/product/noauthority/totalpages"
        );
        setTotalPages(response.data);
      } catch (err) {
        console.error("Błąd podczas pobierania liczby stron:", err.message);
      }
    };

    fetchTotalPages();
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

        <div className="pages-container">
          <button
            className="arrow-btn"
            onClick={() => setPage(page - 1)}
            disabled={page <= 0}
          >
            <span
              className="material-icons md-48"
              id="arrow"
              title="previous page"
            >
              arrow_back_ios
            </span>
          </button>
          <span></span>
          <button
            className="arrow-btn"
            onClick={() => setPage(page + 1)}
            disabled={page >= totalPages - 1}
          >
            <span className="material-icons md-48" id="arrow" title="next page">
              arrow_forward_ios
            </span>
          </button>
        </div>
      </div>
    </>
  );
};

export default ListItems;

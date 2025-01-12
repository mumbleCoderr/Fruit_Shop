import Item from "./Item";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "../stylesheets/ListItem.css";
import { getUserRole } from "../js/Auth";

const ListItems = () => {
  const [fruits, setFruits] = useState([]); // Stan dla produktów
  const [error, setError] = useState(null); // Stan dla błędów
  const [page, setPage] = useState(0); // Stan dla numeru strony
  const [totalPages, setTotalPages] = useState(0); // Stan dla liczby stron
  const navigate = useNavigate();

  // Fetch products on page change
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
  }, [page]); // Ponownie ładowanie danych przy zmianie strony

  // Fetch total pages on component mount
  useEffect(() => {
    const fetchTotalPages = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/product/noauthority/totalpages"
        );
        setTotalPages(response.data); // Zakładając, że API zwraca liczbę stron
      } catch (err) {
        console.error("Błąd podczas pobierania liczby stron:", err.message);
      }
    };

    fetchTotalPages();
  }, []); // Tylko na starcie komponentu

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

      {/* Paginacja */}
      <div className="pagination">
        <button
          onClick={() => setPage(page - 1)}
          disabled={page <= 0} // Zablokuj przycisk "Previous" na pierwszej stronie
        >
          Previous
        </button>
        <span>
          Page {page + 1} of {totalPages}
        </span>
        <button
          onClick={() => setPage(page + 1)}
          disabled={page >= totalPages - 1} // Zablokuj przycisk "Next" na ostatniej stronie
        >
          Next
        </button>
      </div>
    </>
  );
};

export default ListItems;

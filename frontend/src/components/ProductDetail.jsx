import { useParams, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";
import "../stylesheets/ProductDetail.css";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [fruit, setFruit] = useState(null);
  const [error, setError] = useState(null);
  const [showPhoto, setShowPhoto] = useState(false);

  useEffect(() => {
    const fetchFruit = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/product/get/${id}`
        );
        setFruit(response.data);
      } catch (err) {
        setError(err.message);
        navigate("/NotFound");
      }
    };

    fetchFruit();
  }, [id, navigate]);

  const togglePhotoVisibility = () => {
    setShowPhoto(!showPhoto);
  };

  const handleReturnToShop = () => {
    navigate("/");
  };

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  if (!fruit) {
    return null;
  }

  return (
    <div className="container">
      <div className="product-detail">
        <div className="left">
          <h1 className="fruit-name-value">{fruit.name}</h1>
          <p className="product-detail-value">Price: {fruit.price} zł</p>
          <p className="product-detail-value">Quantity: {fruit.quantity}</p>
        </div>
        <div className="right-top">
          <button className="details-btn" onClick={togglePhotoVisibility}>
            {showPhoto ? "Hide photo" : "Show photo"}{" "}
          </button>
        </div>
        <div className="right-bottom">
          <button className="details-btn" onClick={handleReturnToShop}>
            return shop
          </button>
        </div>
      </div>
      <div className="container-bottom">
        <div className="photo-div">
          {showPhoto && (
            <img src={fruit.img} alt={fruit.name} className="product-image" />
          )}
        </div>
        <div className="blank-div"></div>
      </div>
    </div>
  );
};

export default ProductDetail;

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toggleFavorite } from "../features/favorites/favoritesSlice";

interface ProductCardProps {
  product: {
    id: number;
    title: string;
    price: number;
    category: string;
    image: string;
    rating?: {
      rate: number;
      count: number;
    };
  };
}
function ProductCard({ product }: ProductCardProps) {
  const dispatch = useDispatch();
  const isFavorite = useSelector((state: any) =>
    state.favorites.items.some((item: any) => item.id === product.id)
  );
  const handleToggleFavorite = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(toggleFavorite(product));
    // Toggle favorite logic here
  };
  return (
    <Link to={`/product/${product.id}`} className="product-card">
      <div className="product-image-container">
        <img
          src={product.image}
          alt={product.title}
          className="product-image"
        />
        <button
          onClick={handleToggleFavorite}
          className={`favorite-button ${isFavorite ? "active" : ""}`}
          aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
        >
          {isFavorite ? "♥" : "♡"}
        </button>
      </div>
      <div className="product-info">
        <h3 className="product-title">{product.title}</h3>
        <div className="product-price">${product.price.toFixed(2)}</div>
        <div className="product-rating">
          ⭐ {product.rating?.rate || 0} ({product.rating?.count || 0} reviews)
        </div>
        <div className="product-category">{product.category}</div>
      </div>
    </Link>
  );
}

export default ProductCard;

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { ProductsAPI } from "../api/productsApi";
import { fetchProducts } from "../features/products/productsSlice";
import { toggleFavorite } from "../features/favorites/favoritesSlice";

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch<any>();
  const [product, setProduct] = React.useState<any>(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const isFavorite = useSelector((state: any) =>
    state.favorites.items.some((item: any) => item.id === product?.id)
  );
  useEffect(() => {
    const fetchProductDetail = async () => {
      if (!id) {
        setError(null);
        return;
      }
      try {
        setLoading(true);
        const res = await ProductsAPI.getProductById(Number(id));
        setProduct(res.data);
      } catch (error: any) {
        console.error("Failed to fetch product detail:", error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchProductDetail();
  }, [id]);

  const handleToggleFavorite = () => {
    if (product) dispatch(toggleFavorite(product));
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading products...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <p>Error: {error}</p>
        <button onClick={() => dispatch(fetchProducts())}>Retry</button>
      </div>
    );
  }
  return (
    <div>
      <div className="product-detail-page">
        <button onClick={() => navigate(-1)} className="back-button">
          ← Back
        </button>

        <div className="product-detail">
          <div className="product-image-section">
            <img
              src={product?.image}
              alt={product?.title}
              className="product-detail-image"
            />
          </div>

          <div className="product-info-section">
            <h1 className="product-title">{product?.title}</h1>
            <div className="product-category">{product?.category}</div>

            <div className="product-price-section">
              <span className="product-price">
                ${product?.price.toFixed(2)}
              </span>
              <div className="product-rating">
                ⭐ {product?.rating?.rate || 0}
                <span className="rating-count">
                  ({product?.rating?.count || 0} reviews)
                </span>
              </div>
            </div>

            <p className="product-description">{product?.description}</p>

            <div className="product-actions">
              <button className="add-to-cart-button">Add to Cart</button>
              <button
                onClick={handleToggleFavorite}
                // className={`favorite-button ${isFavorite ? "active" : ""}`}
              >
                {isFavorite ? "♥ Remove from Favorites" : "♡ Add to Favorites"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;

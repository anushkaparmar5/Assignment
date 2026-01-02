import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { removeFavorite } from "../features/favorites/favoritesSlice";

function Favorites() {
  const favorites = useSelector((state: any) => state.favorites.items);
  const dispatch = useDispatch();
  const handleRemoveFavorite = (id: number) => {
    dispatch(removeFavorite(id));
  };
  return (
    <div>
      <div className="favorites-page">
        <h1>My Favorites</h1>

        {favorites.length === 0 ? (
          <div className="empty-favorites">
            <p>You haven't added any favorites yet.</p>
            <Link to="/" className="browse-products-link">
              Browse Products
            </Link>
          </div>
        ) : (
          <>
            <div className="favorites-grid">
              {favorites.map((product: any) => (
                <div key={product.id} className="favorite-item">
                  <ProductCard product={product} />
                  <button
                    onClick={() => handleRemoveFavorite(product.id)}
                    className="remove-favorite-button"
                    aria-label="Remove from favorites"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>

            <div className="favorites-summary">
              <p>Total Favorites: {favorites.length}</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Favorites;

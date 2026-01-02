import { useEffect } from "react";
import { fetchProducts } from "../features/products/productsSlice";
import type { AppDispatch } from "../store/store";
import { useDispatch, useSelector } from "react-redux";
import ProductCard from "../components/ProductCard";
import FilterPanel from "../components/FilterPanel";
import SearchBar from "../components/SearchBar";

function ProductsList() {
  // const dispatch: AppDispatch = useDispatch();

  const dispatch = useDispatch<AppDispatch>();
  const { filteredItems, loading, error } = useSelector(
    (state: any) => state.products
  );
  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

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
    <div className="product-listing-page">
      <div className="page-header">
        <h1>Products</h1>
        <SearchBar />
      </div>

      <div className="page-content">
        <aside className="sidebar">
          {" "}
          <FilterPanel />{" "}
        </aside>

        <main className="product-grid">
          {filteredItems.length === 0 ? (
            <div className="no-results">
              <p>No products found. Try adjusting your search or filters.</p>
            </div>
          ) : (
            filteredItems.map((product: any) => (
              <ProductCard key={product.id} product={product} />
            ))
          )}
        </main>
      </div>
    </div>
  );
}
export default ProductsList;

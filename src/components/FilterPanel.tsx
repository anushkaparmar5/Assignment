import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  applyFilter,
  fetchCategories,
  setCategoryFilter,
  setSortBy,
} from "../features/products/productsSlice";
import type { AppDispatch } from "../store/store";

function FilterPanel() {
  const dispatch = useDispatch<AppDispatch>();
  const filters = useSelector((state: any) => state.products.filter);

  const categories = useSelector((state: any) => state.products.categories);
  useEffect(() => {
    if (categories.length === 0) {
      dispatch(fetchCategories());
    }
  }, [dispatch, categories.length]);

  const handleCategoryChange = (category: string) => {
    dispatch(setCategoryFilter(category));
    dispatch(applyFilter());
  };
  const handleSortChange = (value: string) => {
    dispatch(setSortBy(value));
    dispatch(applyFilter());
  };

  return (
    <div className="filter-panel">
      <div className="filter-section">
        <h3>Categories</h3>
        <div className="category-filters">
          <button
            onClick={() => handleCategoryChange("")}
            className={`category-filter ${!filters.category ? "active" : ""}`}
          >
            All Categories
          </button>
          {categories?.map((category: any) => (
            <button
              key={category}
              onClick={() => handleCategoryChange(category)}
              className={`category-filter ${
                filters.category === category ? "active" : ""
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <div className="filter-section">
        <h3>Sort By</h3>
        <select
          value={filters.sortBy}
          onChange={(e) => handleSortChange(e.target.value)}
          className="sort-select"
          aria-label="Sort products"
        >
          <option value="default">Default</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
          <option value="rating">Rating</option>
        </select>
      </div>
    </div>
  );
}

export default FilterPanel;

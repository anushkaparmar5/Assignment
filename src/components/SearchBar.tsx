import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import debounce from "lodash.debounce";
import {
  setSearchQuery,
  applyFilter,
} from "../features/products/productsSlice";

function SearchBar() {
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();

  const debouncedSearch = useCallback(
    debounce((term: string) => {
      dispatch(setSearchQuery(term));
      dispatch(applyFilter());
    }, 300),
    [dispatch]
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      debouncedSearch(searchTerm);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  return (
    <div>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
          aria-label="Search products"
        />
      </div>
    </div>
  );
}

export default SearchBar;

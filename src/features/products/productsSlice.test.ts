import { describe, it, expect } from "vitest";
import {
  productsReducer,
  setCategoryFilter,
  setSearchQuery,
  setSortBy,
  applyFilter,
  fetchProducts,
} from "./productsSlice";

describe("productsSlice", () => {
  const initialState = {
    items: [],
    filteredItems: [],
    categories: [],
    loading: false,
    error: null,
    filter: {
      searchQuery: "",
      category: "",
      sortBy: "default",
    },
  };

  it("should handle initial state", () => {
    expect(productsReducer(undefined, { type: "unknown" })).toEqual(
      initialState
    );
  });

  it("should handle setSearchQuery", () => {
    const actual = productsReducer(initialState, setSearchQuery("test"));
    expect(actual.filter.searchQuery).toEqual("test");
  });

  it("should handle setCategory", () => {
    const actual = productsReducer(
      initialState,
      setCategoryFilter("electronics")
    );
    expect(actual.filter.category).toEqual("electronics");
  });

  it("should handle setSortBy", () => {
    const actual = productsReducer(initialState, setSortBy("price-low"));
    expect(actual.filter.sortBy).toEqual("price-low");
  });

  it("should apply filters correctly", () => {
    const stateWithProducts = {
      ...initialState,
      items: [
        {
          id: 1,
          title: "Test Product",
          price: 100,
          category: "electronics",
          rating: { rate: 4.5 },
        },
        {
          id: 2,
          title: "Another Product",
          price: 50,
          category: "clothing",
          rating: { rate: 3.5 },
        },
      ],
    };

    const stateWithFilter = {
      ...stateWithProducts,
      filter: {
        searchQuery: "test",
        category: "electronics",
        sortBy: "default",
      },
    };

    const actual = productsReducer(stateWithFilter, applyFilter());
    expect(actual.filteredItems).toHaveLength(1);
    expect(actual.filteredItems[0].id).toBe(1);
  });

  it("should handle fetchProducts.pending", () => {
    const action = { type: fetchProducts.pending.type };
    const state = productsReducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      loading: true,
      error: null,
    });
  });
});

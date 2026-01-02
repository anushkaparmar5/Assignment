import { describe, it, expect } from "vitest";
import {
  favoritesReducer,
  removeFavorite,
  toggleFavorite,
} from "./favoritesSlice";

describe("favoritesSlice", () => {
  const initialState = { items: [] };
  const sampleProduct = { id: 1, title: "Test Product", price: 100 };

  it("should handle initial state", () => {
    expect(favoritesReducer(undefined, { type: "unknown" })).toEqual(
      initialState
    );
  });

  it("should handle toggleFavorite - add product", () => {
    const actual = favoritesReducer(
      initialState,
      toggleFavorite(sampleProduct)
    );
    expect(actual.items).toEqual([sampleProduct]);
  });

  it("should handle toggleFavorite - remove product", () => {
    const stateWithProduct = { items: [sampleProduct] };
    const actual = favoritesReducer(
      stateWithProduct,
      toggleFavorite(sampleProduct)
    );
    expect(actual.items).toEqual([]);
  });

  it("should handle removeFavorite", () => {
    const stateWithProducts = {
      items: [sampleProduct, { id: 2, title: "Another", price: 50 }],
    };
    const actual = favoritesReducer(stateWithProducts, removeFavorite(1));
    expect(actual.items).toHaveLength(1);
    expect(actual.items[0].id).toBe(2);
  });
});

import { createSlice } from "@reduxjs/toolkit";

const favoritesSlice = createSlice({
  name: "favorites",
  initialState: {
    items: [] as any[],
  },
  reducers: {
    addFavorite: (state, action) => {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      );
      if (!existingItem) {
        state.items.push(action.payload);
      }
    },
    toggleFavorite: (state, action) => {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      );
      if (existingItem) {
        state.items = state.items.filter(
          (item) => item.id !== action.payload.id
        );
      } else {
        state.items.push(action.payload);
      }
    },
    removeFavorite: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
  },
});

export const { addFavorite, removeFavorite, toggleFavorite } =
  favoritesSlice.actions;
export const favoritesReducer = favoritesSlice.reducer;

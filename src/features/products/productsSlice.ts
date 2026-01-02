import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import { ProductsAPI } from "../../api/productsApi";

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (_, { rejectWithValue }) => {
    try {
      const res = await ProductsAPI.getProducts();
      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.res?.data || error.message);
    }
  }
);

export const fetchCategories = createAsyncThunk(
  "products/fetchCategories",
  async (_, { rejectWithValue }) => {
    try {
      const res = await ProductsAPI.getCategories();
      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.res?.data || error.message);
    }
  }
);

interface ProductsState {
  items: any[];
  categories: string[];
  filteredItems: any[];
  loading: boolean;
  error: string | null;
  filter: {
    category: string;
    sortBy: string;
    searchQuery: string;
  };
}

const productsSlice = createSlice({
  name: "products",
  initialState: {
    items: [] as any[],
    filteredItems: [] as any[],
    categories: [] as string[],
    loading: false,
    error: null as string | null,
    filter: {
      category: "",
      sortBy: "default",
      searchQuery: "",
    },
  } as ProductsState,
  reducers: {
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.filter.searchQuery = action.payload;
    },
    setCategoryFilter: (state, action: PayloadAction<string>) => {
      state.filter.category = action.payload;
    },
    setSortBy: (state, action: PayloadAction<string>) => {
      state.filter.sortBy = action.payload;
    },
    applyFilter: (state) => {
      let filteredItems = state.items;
      if (state.filter.category) {
        filteredItems = filteredItems.filter(
          (item) => item.category === state.filter.category
        );
      }
      if (state.filter.searchQuery) {
        filteredItems = filteredItems.filter((item) =>
          item.title
            .toLowerCase()
            .includes(state.filter.searchQuery.toLowerCase())
        );
      }
      if (state.filter.sortBy === "price-low") {
        filteredItems = filteredItems.slice().sort((a, b) => a.price - b.price);
      } else if (state.filter.sortBy === "price-high") {
        filteredItems = filteredItems.slice().sort((a, b) => b.price - a.price);
      } else if (state.filter.sortBy === "rating") {
        filteredItems = filteredItems
          .slice()
          .sort((a, b) => b.rating.rate - a.rating.rate);
      }
      state.filteredItems = filteredItems;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        (state.loading = true), (state.error = null);
      })
      .addCase(fetchProducts.rejected, (state) => {
        (state.loading = false), (state.error = "Failed to fetch products");
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        (state.loading = false), (state.items = action.payload);
      }),
      builder
        .addCase(fetchCategories.pending, (state) => {
          (state.loading = true), (state.error = null);
        })
        .addCase(fetchCategories.rejected, (state) => {
          (state.loading = false), (state.error = "Failed to fetch categories");
        })
        .addCase(fetchCategories.fulfilled, (state, action) => {
          (state.loading = false), (state.categories = action.payload);
        });
  },
});
export const productsReducer = productsSlice.reducer;
export const { setSearchQuery, setCategoryFilter, setSortBy, applyFilter } =
  productsSlice.actions;

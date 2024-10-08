import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  isLoading: true,
  productList: [],
  productDetails: null,
};

// get product async thunk action
export const fetchAllShopProducts = createAsyncThunk(
  "/shop/products/get",
  async ({ filterParams, sortParams }) => {
    try {
      const query = new URLSearchParams({
        ...filterParams,
        sortBy: sortParams,
      });

      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/shop/products/get?${query}`,
        {
          withCredentials: true,
        }
      );

      return response.data;
    } catch (error) {
      console.log("Error fetching products", error);
    }
  }
);

// get single product details async thunk action
export const getproductDetailsAction = createAsyncThunk(
  "/shop/products/get/:id",
  async (productId) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/shop/products/get/${productId}`,
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      console.log("error getting product details", error);
    }
  }
);

const shopProductSlice = createSlice({
  name: "shopProduct",
  initialState,
  reducers: {
    setProductDetails: (state) => {
      state.productDetails = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllShopProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllShopProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.productList = action?.payload?.data;
      })
      .addCase(fetchAllShopProducts.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(getproductDetailsAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getproductDetailsAction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.productDetails = action?.payload?.data;
      })
      .addCase(getproductDetailsAction.rejected, (state) => {
        state.isLoading = false;
        state.productDetails = null;
      });
  },
});

export const { setProductDetails } = shopProductSlice.actions;
export default shopProductSlice.reducer;

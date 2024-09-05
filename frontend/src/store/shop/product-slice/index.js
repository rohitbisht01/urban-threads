import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  isLoading: true,
  productList: [],
};

// get product async thunk action
export const fetchAllShopProducts = createAsyncThunk(
  "/shop/products/get",
  async () => {
    try {
      const response = await axios.get(
        "http://localhost:4000/api/shop/products/get",
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

const shopProductSlice = createSlice({
  name: "shopProduct",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllShopProducts.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(fetchAllShopProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.productList = action?.payload?.data;
      })
      .addCase(fetchAllShopProducts.rejected, (state, action) => {
        state.isLoading = false;
      });
  },
});

export default shopProductSlice.reducer;

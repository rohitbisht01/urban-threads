import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  reviews: [],
};

export const getProductReviewsAction = createAsyncThunk(
  "/get/reviews",
  async (productId) => {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/shop/review/${productId}`
    );
    return response.data;
  }
);

export const addProductReviewAction = createAsyncThunk(
  "/add/reviews",
  async (formData) => {
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/api/shop/review/add`,
      formData
    );
    return response.data;
  }
);

const reviewSlice = createSlice({
  name: "review",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProductReviewsAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProductReviewsAction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.reviews = action?.payload?.data;
      })
      .addCase(getProductReviewsAction.rejected, (state) => {
        state.isLoading = false;
        state.reviews = [];
      });
  },
});

export default reviewSlice.reducer;

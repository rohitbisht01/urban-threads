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
      `http://localhost:4000/api/shop/review/${productId}`
    );
    return response.data;
  }
);

export const addProductReviewAction = createAsyncThunk(
  "/add/reviews",
  async (formData) => {
    const response = await axios.post(
      `http://localhost:4000/api/shop/review/add`,
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
      .addCase(getProductReviewsAction.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getProductReviewsAction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.reviews = action?.payload?.data;
      })
      .addCase(getProductReviewsAction.rejected, (state, action) => {
        state.isLoading = false;
        state.reviews = [];
      });
  },
});

export default reviewSlice.reducer;

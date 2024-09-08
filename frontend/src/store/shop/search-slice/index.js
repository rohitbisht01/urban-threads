import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  searchResults: [],
};

export const getSearchResultsAction = createAsyncThunk(
  "/order/getSearch",
  async (keyword) => {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/shop/search/${keyword}`
    );

    return response.data;
  }
);

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    resetSearchResults: (state) => {
      state.searchResults = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getSearchResultsAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSearchResultsAction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.searchResults = action.payload.data;
      })
      .addCase(getSearchResultsAction.rejected, (state) => {
        state.isLoading = false;
        state.searchResults = [];
      });
  },
});

export const { resetSearchResults } = searchSlice.actions;

export default searchSlice.reducer;

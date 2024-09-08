import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  cartItems: [],
};

// get cart items async thunk action
export const fetchAllCartItemsAction = createAsyncThunk(
  "cart/fetchAllCartItemsAction",
  async (userId) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/shop/cart/get/${userId}`
      );

      return response.data;
    } catch (error) {
      console.log("error fetch cart items", error);
    }
  }
);

// add to cart async thunk action
export const addToCartAction = createAsyncThunk(
  "cart/addToCartAction",
  async ({ userId, productId, quantity }) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/shop/cart/add`,
        {
          userId,
          productId,
          quantity,
        }
        // {
        //   withCredentials: true,
        // }
      );

      return response.data;
    } catch (error) {
      console.log("error adding product to cart", error);
    }
  }
);

// delete cart items async thunk action
export const deleteCartItemAction = createAsyncThunk(
  "cart/deleteCartItemAction",
  async ({ userId, productId }) => {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_API_URL}/api/shop/cart/${userId}/${productId}`
        // {
        //   withCredentials: true,
        // }
      );

      return response.data;
    } catch (error) {
      console.log("error deleting product to cart", error);
    }
  }
);

// update cart items async thunk action
export const updateCartItemAction = createAsyncThunk(
  "cart/updateCartItemAction",
  async ({ userId, productId, quantity }) => {
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/api/shop/cart/update-cart`,
        { userId, productId, quantity }
        // {
        //   withCredentials: true,
        // }
      );

      return response.data;
    } catch (error) {
      console.log("error updating product to cart", error);
    }
  }
);

const shopCartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addToCartAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addToCartAction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartItems = action?.payload?.data;
      })
      .addCase(addToCartAction.rejected, (state) => {
        state.isLoading = false;
        state.cartItems = [];
      })
      .addCase(fetchAllCartItemsAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllCartItemsAction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartItems = action?.payload?.data;
      })
      .addCase(fetchAllCartItemsAction.rejected, (state) => {
        state.isLoading = false;
        state.cartItems = [];
      })
      .addCase(updateCartItemAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateCartItemAction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartItems = action?.payload?.data;
      })
      .addCase(updateCartItemAction.rejected, (state) => {
        state.isLoading = false;
        state.cartItems = [];
      })
      .addCase(deleteCartItemAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteCartItemAction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartItems = action?.payload?.data;
      })
      .addCase(deleteCartItemAction.rejected, (state) => {
        state.isLoading = false;
        state.cartItems = [];
      });
  },
});

export default shopCartSlice.reducer;

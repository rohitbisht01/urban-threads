import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  cartItems: [],
};

// get cart items async thunk action
export const fetchAllCartItemsAction = createAsyncThunk(
  "cart/getCart",
  async (userId) => {
    try {
      const response = await axios.get(
        `http://localhost:4000/api/shop/cart/add/${userId}`,
        {
          withCredentials: true,
        }
      );

      return response.data;
    } catch (error) {
      console.log("error fetch cart items", error);
    }
  }
);

// add to cart async thunk action
export const addToCartAction = createAsyncThunk(
  "cart/addToCart",
  async ({ userId, productId, quantity }) => {
    try {
      const response = await axios.post(
        `http://localhost:4000/api/shop/cart/add`,
        {
          userId,
          productId,
          quantity,
        },
        {
          withCredentials: true,
        }
      );

      return response.data;
    } catch (error) {
      console.log("error adding product to cart", error);
    }
  }
);

// delete cart items async thunk action
export const deleteCartItemAction = createAsyncThunk(
  "cart/deleteItem",
  async ({ userId, productId }) => {
    try {
      const response = await axios.delete(
        `http://localhost:4000/api/shop/cart/${userId}/${productId}`,
        {
          withCredentials: true,
        }
      );

      return response.data;
    } catch (error) {
      console.log("error deleting product to cart", error);
    }
  }
);

// update cart items async thunk action
export const updateCartItemAction = createAsyncThunk(
  "cart/updatedCart",
  async ({ userId, productId, quantity }) => {
    try {
      const response = await axios.put(
        `http://localhost:4000/api/shop/cart/update-cart`,
        { userId, productId, quantity },
        {
          withCredentials: true,
        }
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
      .addCase(addToCartAction.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(addToCartAction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartItems = action?.payload?.data;
      })
      .addCase(addToCartAction.rejected, (state, action) => {
        state.isLoading = false;
        state.cartItems = [];
      })
      .addCase(fetchAllCartItemsAction.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(fetchAllCartItemsAction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartItems = action?.payload?.data;
      })
      .addCase(fetchAllCartItemsAction.rejected, (state, action) => {
        state.isLoading = false;
        state.cartItems = [];
      })
      .addCase(updateCartItemAction.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(updateCartItemAction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartItems = action?.payload?.data;
      })
      .addCase(updateCartItemAction.rejected, (state, action) => {
        state.isLoading = false;
        state.cartItems = [];
      })
      .addCase(deleteCartItemAction.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(deleteCartItemAction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartItems = action?.payload?.data;
      })
      .addCase(deleteCartItemAction.rejected, (state, action) => {
        state.isLoading = false;
        state.cartItems = [];
      });
  },
});

export default shopCartSlice.reducer;

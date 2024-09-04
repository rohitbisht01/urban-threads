import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  productList: [],
};

// thunk to create new product
export const addProductAction = createAsyncThunk(
  "/products/addnewproduct",
  async (formData) => {
    try {
      const response = await axios.post(
        "http://localhost:4000/api/admin/products/add",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
          // withCredentials: true,
        }
      );

      return response?.data;
    } catch (error) {
      console.log(error);
    }
  }
);

// thunk to fetch all products
export const fetchAllProductsAction = createAsyncThunk(
  "/products/fetchAllProducts",
  async () => {
    try {
      const response = await axios.get(
        "http://localhost:4000/api/admin/products/get"
      );

      return response?.data;
    } catch (error) {
      console.log(error);
    }
  }
);

// thunk to edit a product
export const editProductAction = createAsyncThunk(
  "/products/editProduct",
  async ({ id, formData }) => {
    try {
      const response = await axios.put(
        `http://localhost:4000/api/admin/products/edit/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
          // withCredentials:true
        }
      );

      return response?.data;
    } catch (error) {
      console.log(error);
    }
  }
);

// thunk to delete a product
export const deleteProductAction = createAsyncThunk(
  "product/delete",
  async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:4000/api/admin/products/delete/${id}`,
        {
          //   withCredentials: true,
        }
      );

      return response?.data;
    } catch (error) {
      console.log(error);
    }
  }
);

const adminProductSlice = createSlice({
  name: "adminProduct",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProductsAction.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(fetchAllProductsAction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.productList = action.payload.data;
      })
      .addCase(fetchAllProductsAction.rejected, (state, action) => {
        state.isLoading = false;
        state.productList = [];
      });
  },
});

export default adminProductSlice.reducer;

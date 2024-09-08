import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  addressList: [],
};

// async thunk action to get address
export const fetchAllAddressAction = createAsyncThunk(
  "/shop/fetchAllAddressAction",
  async (userId) => {
    try {
      const response = await axios.get(
        `http://localhost:4000/api/shop/address/get/${userId}`
      );

      return response.data;
    } catch (error) {
      console.log("Error fetching addresses", error);
    }
  }
);

// async thunk action to create address
export const addAddressAction = createAsyncThunk(
  "/add/createAddressAction",
  async (formData) => {
    try {
      const response = await axios.post(
        `http://localhost:4000/api/shop/address/add/`,
        formData
      );

      return response.data;
    } catch (error) {
      console.log("Error adding addresses", error);
    }
  }
);

// async thunk action to update address
export const updateAddressAction = createAsyncThunk(
  "update/address",
  async ({ userId, addressId, formData }) => {
    try {
      const response = await axios.put(
        `http://localhost:4000/api/shop/address/update/${userId}/${addressId}`,
        formData
      );

      return response.data;
    } catch (error) {
      console.log("Error updating address", error);
    }
  }
);

// async thunk action to delete address
export const deleteAddressAction = createAsyncThunk(
  "/delete/address",
  async ({ userId, addressId }) => {
    try {
      const response = await axios.delete(
        `http://localhost:4000/api/shop/address/delete/${userId}/${addressId}`
      );

      return response.data;
    } catch (error) {
      console.log("Error deleting address", error);
    }
  }
);

const addressSlice = createSlice({
  name: "address",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addAddressAction.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(addAddressAction.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(addAddressAction.rejected, (state, action) => {
        state.isLoading = false;
      })
      .addCase(fetchAllAddressAction.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(fetchAllAddressAction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.addressList = action?.payload?.data;
      })
      .addCase(fetchAllAddressAction.rejected, (state, action) => {
        state.isLoading = false;
        state.addressList = [];
      });
  },
});

export default addressSlice.reducer;

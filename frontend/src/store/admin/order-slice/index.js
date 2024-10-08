import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  orderList: [],
  orderDetails: null,
};

export const fetchAllOrdersForAdminAction = createAsyncThunk(
  "/get/fetchAllOrders",
  async () => {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/admin/order/get`
    );
    return response.data;
  }
);

export const fetchOrderDetailForAdminAction = createAsyncThunk(
  "/get/fetchAllOrdersForAdmin",
  async (id) => {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/admin/order/details/${id}`
    );
    return response.data;
  }
);

export const updateOrderStatusAction = createAsyncThunk(
  "/order/updateOrder",
  async ({ id, orderStatus }) => {
    const response = await axios.put(
      `${import.meta.env.VITE_API_URL}/api/admin/order/update/${id}`,
      { orderStatus }
    );
    return response.data;
  }
);

const OrderSlice = createSlice({
  name: "admin-order",
  initialState,
  reducers: {
    resetOrderDetails: (state) => {
      state.orderDetails = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllOrdersForAdminAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllOrdersForAdminAction.fulfilled, (state, action) => {
        state.isLoading = true;
        state.orderList = action?.payload?.data;
      })
      .addCase(fetchAllOrdersForAdminAction.rejected, (state) => {
        state.isLoading = false;
        state.orderList = [];
      })
      .addCase(fetchOrderDetailForAdminAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchOrderDetailForAdminAction.fulfilled, (state, action) => {
        state.isLoading = true;
        state.orderDetails = action?.payload?.data;
      })
      .addCase(fetchOrderDetailForAdminAction.rejected, (state) => {
        state.isLoading = false;
        state.orderDetails = null;
      });
  },
});

export const { resetOrderDetails } = OrderSlice.actions;
export default OrderSlice.reducer;

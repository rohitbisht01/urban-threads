import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  approvalURL: null,
  isLoading: false,
  orderId: null,
  orderList: [],
  orderDetails: null,
};

// create new order async thunk action
export const createNewOrderAction = createAsyncThunk(
  "/order/createNewOrder",
  async (orderData) => {
    const response = await axios.post(
      "http://localhost:4000/api/shop/order/create",
      orderData
    );

    return response.data;
  }
);

// capture payment async thunk action
export const capturePaymentAction = createAsyncThunk(
  "/order/capturePayment",
  async ({ paymentId, payerId, orderId }) => {
    const response = await axios.post(
      "http://localhost:4000/api/shop/order/capture",
      {
        paymentId,
        payerId,
        orderId,
      }
    );

    return response.data;
  }
);

// get all orders by userid async thunk action
export const getAllOrdersByUserIdAction = createAsyncThunk(
  "/order/getAllOrdersByUserId",
  async (userId) => {
    const response = await axios.get(
      `http://localhost:4000/api/shop/order/list/${userId}`
    );

    return response.data;
  }
);

// get order details async thunk action
export const getOrderDetailsAction = createAsyncThunk(
  "/order/getOrderDetails",
  async (id) => {
    const response = await axios.get(
      `http://localhost:4000/api/shop/order/details/${id}`
    );

    return response.data;
  }
);

export const ShopOrderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    resetOrderDetails: (state) => {
      state.orderDetails = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createNewOrderAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createNewOrderAction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.approvalURL = action.payload.approvalURL;
        state.orderId = action.payload.orderId;
        sessionStorage.setItem(
          "currentOrderId",
          JSON.stringify(action.payload.orderId)
        );
      })
      .addCase(createNewOrderAction.rejected, (state) => {
        state.isLoading = false;
        state.approvalURL = null;
        state.orderId = null;
      })
      .addCase(getAllOrdersByUserIdAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllOrdersByUserIdAction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderList = action.payload.data;
      })
      .addCase(getAllOrdersByUserIdAction.rejected, (state) => {
        state.isLoading = false;
        state.orderList = [];
      })
      .addCase(getOrderDetailsAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOrderDetailsAction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderDetails = action.payload.data;
      })
      .addCase(getOrderDetailsAction.rejected, (state) => {
        state.isLoading = false;
        state.orderDetails = null;
      });
  },
});

export const { resetOrderDetails } = ShopOrderSlice.actions;

export default ShopOrderSlice.reducer;

// https://developer.paypal.com/dashboard/applications/edit/SB:QVhISUg0U2Q0VEgxVi02dUZSYUNzWjhaYnlBRjBLNXdhLWFoc3VnU2tDdDY1NVRockhDdVI4LUl2V216NkFiejd0MVZoYzZ6U2xHYmJGWGs=

// https://developer.paypal.com/dashboard/accounts

// https://www.npmjs.com/package/paypal-rest-sdk

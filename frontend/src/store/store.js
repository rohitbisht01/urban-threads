import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth-slice";
import adminProductReducer from "./admin/product-slice";
import shopProductReducer from "./shop/product-slice";
import shopCartReducer from "./shop/cart-slice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    adminProducts: adminProductReducer,
    shopProducts: shopProductReducer,
    shopCart: shopCartReducer,
  },
});

export default store;

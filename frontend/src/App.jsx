import { Route, Routes } from "react-router-dom";
import AuthLayout from "./components/ui/auth/Layout";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import AdminLayout from "./components/ui/admin/Layout";
import AdminDashboard from "./pages/admin/Dashboard";
import AdminProducts from "./pages/admin/Products";
import AdminOrders from "./pages/admin/Orders";
import ShoppingLayout from "./components/ui/shopping/Layout";
import NotFound from "./pages/not-found";
import ShoppingHome from "./pages/shopping/ShoppingHome";
import ShoppingListing from "./pages/shopping/ShoppingListing";
import AccountPage from "./pages/shopping/AccountPage";
import Checkout from "./pages/shopping/Checkout";
import CheckAuth from "./components/ui/common/CheckAuth";
import UnauthorizedPage from "./pages/unauthorized-page";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { checkAuthAction } from "./store/auth-slice";
import { Skeleton } from "./components/ui/skeleton";
import PaypalReturn from "./pages/shopping/PaypalReturn";
import PaymentSuccess from "./pages/shopping/PaymentSuccess";
import Search from "./pages/shopping/Search";

const App = () => {
  const { isAuthenticated, user, isLoading } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();

  useEffect(() => {
    const token = JSON.parse(sessionStorage.getItem("token"));
    dispatch(checkAuthAction(token));
  }, [dispatch]);

  if (isLoading) return <Skeleton className="w-[800px] h-[600px]" />;

  return (
    <div className="flex flex-col overflow-hidden bg-white">
      <Routes>
        <Route
          path="/"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <AuthLayout />
            </CheckAuth>
          }
        ></Route>
        <Route
          path="/auth"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <AuthLayout />
            </CheckAuth>
          }
        >
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
        <Route
          path="/admin"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <AdminLayout />
            </CheckAuth>
          }
        >
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="orders" element={<AdminOrders />} />
        </Route>
        <Route
          path="/shop"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <ShoppingLayout />
            </CheckAuth>
          }
        >
          <Route path="home" element={<ShoppingHome />} />
          <Route path="listing" element={<ShoppingListing />} />
          <Route path="account" element={<AccountPage />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="search" element={<Search />} />
          <Route path="paypal-return" element={<PaypalReturn />} />
          <Route path="payment-success" element={<PaymentSuccess />} />
        </Route>
        <Route path="unauth-page" element={<UnauthorizedPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default App;

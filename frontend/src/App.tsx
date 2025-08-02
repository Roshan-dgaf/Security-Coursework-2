import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import DashboardClothes from "./components/dashboard/DashboardClothes";
import DashboardOrders from "./components/dashboard/DashboardOrders";
import DashboardOverview from "./components/dashboard/DashboardOverview";
import DashboardUsers from "./components/dashboard/DashboardUsers";
import Footer from "./components/Footer";
import Navigation from "./components/Navigation";
import { useAuth } from "./context/AuthContext";
import AccountPage from "./pages/Account";
import Cats from "./pages/Cats";
import CheckoutPage from "./pages/Checkout";
import Dashboard from "./pages/Dashboard";
import Dogs from "./pages/Dogs";
import ForgotPassword from "./pages/ForgotPassword";
import Home from "./pages/Home";
import Login from "./pages/Login";
import MfaPage from "./pages/MfaPage";
import ProductPage from "./pages/Product";
import Register from "./pages/Register";
import ResetPassword from "./pages/ResetPassword";
import SingleProduct from "./pages/SingleProduct";
import VerifyEmailPage from "./pages/VerifyEmailPage";

function App() {
  const location = useLocation();
  const { user } = useAuth();

  // Hide Navigation if path starts with "/dashboard"
  const hideNav = location.pathname.startsWith("/dashboard");

  return (
    <>
      {!hideNav && <Navigation />}
      <Routes>
        {/* Public routes (no auth required) */}
        <Route path="/" element={<Home />} />
        <Route path="/clothes/:id" element={<SingleProduct />} />
        <Route path="/clothes/all" element={<ProductPage />} />
        <Route path="/dogs" element={<Dogs />} />
        <Route path="/cats" element={<Cats />} />
        <Route path="/email-verification/:code" element={<VerifyEmailPage />} /> {/* ✅ NEW ROUTE */}

        {/* Guest-only routes */}
        <Route path="/sign-in" element={user ? <Navigate to="/" replace /> : <Login />} />
        <Route path="/sign-up" element={user ? <Navigate to="/" replace /> : <Register />} />
        <Route path="/account-recovery" element={user ? <Navigate to="/" replace /> : <ForgotPassword />} />
        <Route path="/verify-mfa" element={user ? <Navigate to="/" replace /> : <MfaPage />} />
        <Route path="/password/reset" element={user ? <Navigate to="/" replace /> : <ResetPassword />} />

        {/* Protected user routes */}
        <Route path="/checkout" element={user ? <CheckoutPage /> : <Navigate to="/sign-in" replace />} />
        <Route path="/account" element={user ? <AccountPage /> : <Navigate to="/sign-in" replace />} />

        {/* Admin-only dashboard */}
        <Route
          path="/dashboard/*"
          element={
            user && user.role === "admin"
              ? <Dashboard />
              : <Navigate to="/" replace />
          }
        >
          <Route index element={<DashboardOverview />} />
          <Route path="clothes" element={<DashboardClothes />} />
          <Route path="users" element={<DashboardUsers />} />
          <Route path="orders" element={<DashboardOrders />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;

import { Routes, Route, useLocation } from "react-router-dom";
import { Home } from "../../Pages/Home";
import { Store } from "../../Pages/Store";
import { Wishlist } from "../../Pages/Wislist";
import { Cart } from "../../Pages/Cart";
import { Login } from "../../Pages/Login";
import { My } from "../../Pages/My";
import { ProductDetail } from "../../Pages/ProductDetail";
import { ProtectedRoute } from "../ProtectedRoute";
import { SignUp } from "Pages/SignUp";

export const Navigation = () => {
  const location = useLocation();
  return (
    <Routes>
      <Route path="/" element={<Home />} key={location.key} />
      <Route path="/store" element={<Store />} />
      <Route path="/wishlist" element={<Wishlist />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/productdetail/:id" element={<ProductDetail />} />
      <ProtectedRoute path="/my/*" element={<My />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
    </Routes>
  );
};

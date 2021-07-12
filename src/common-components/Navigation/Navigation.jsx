import { Routes, Route, useLocation } from "react-router-dom";
import { Home } from "pages/Home";
import { Store } from "pages/Store";
import { Wishlist } from "pages/Wislist";
import { Cart } from "pages/Cart";
import { Login } from "pages/Login";
import { My } from "pages/My";
import { ProductDetail } from "pages/ProductDetail";
import { ProtectedRoute } from "../ProtectedRoute";
import { BetterRoute } from "common-components/BetterRoute";
import { Signup } from "pages/Signup";
import { PageNotFound } from "pages/PageNotFound";

export const Navigation = () => {
  const location = useLocation();
  return (
    <Routes>
      <Route path="/" element={<Home />} key={location.key} />
      <Route path="/store" element={<Store />} />
      <Route path="/wishlist" element={<Wishlist />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/productdetail/:id" element={<ProductDetail />} />
      <BetterRoute type="PROTECTED" path="/my/*" element={<My />} />
      <BetterRoute type="PUBLIC-ONLY" path="/login" element={<Login />} />
      <BetterRoute type="PUBLIC-ONLY" path="/signup" element={<Signup />} />
      <Route path="/*" element={<PageNotFound />} />
    </Routes>
  );
};

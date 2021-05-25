import { Routes, Route, useLocation } from "react-router-dom";
import { Home } from "../../Pages/Home";
import { Store } from "../../Pages/Store";
import { Wishlist } from "../../Pages/Wislist";
import { Cart } from "../../Pages/Cart";
import { Login } from "../../Pages/Login";
import { Profile } from "../../Pages/Profile";
import { ProductDetail } from "../../Pages/ProductDetail";
import { ProtectedRoute } from "../ProtectedRoute";

export const Navigation = () => {
  const location = useLocation();
  return (
    <Routes>
      <Route path="/" element={<Home />} key={location.key} />
      <Route path="/store" element={<Store />} key={location.key} />
      <Route path="/wishlist" element={<Wishlist />} key={location.key} />
      <Route path="/cart" element={<Cart />} key={location.key} />
      <Route
        path="/productdetail/:id"
        element={<ProductDetail />}
        key={location.key}
      />
      <ProtectedRoute
        path="/profile"
        element={<Profile />}
        key={location.key}
      />
      <Route path="/login" element={<Login />} key={location.key} />
    </Routes>
  );
};

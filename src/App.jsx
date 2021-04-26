import { Routes, Route, Navigate } from "react-router-dom";
import { Home } from "./pages/Home";
import { Store } from "./pages/Store";
import { Wishlist } from "./pages/Wislist";
import { Cart } from "./pages/Cart";
import { Login } from "./pages/Login";
import { Profile } from "./pages/Profile";
import { ProductDetail } from "./pages/ProductDetail";
import { NavBar } from "./components/NavBar";
import { Snakbar } from "./components/Snakbar";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { useSnakbarContext } from "./Context";
import { useAuthContext } from "./Context";

const UserNotReachableRoute = ({ path, ...props }) => {
  const { user } = useAuthContext();
  return !user ? <Route path={path} {...props} /> : <Navigate replace to="/" />;
};

export default function App() {
  const { snakbarStatus } = useSnakbarContext();
  return (
    <main>
      <NavBar></NavBar>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/store" element={<Store />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/productdetail/:id" element={<ProductDetail />} />
        <ProtectedRoute path="/profile" element={<Profile />} />
        <UserNotReachableRoute path="/login" element={<Login />} />
      </Routes>
      {snakbarStatus["isShow"] === true && <Snakbar></Snakbar>}
    </main>
  );
}

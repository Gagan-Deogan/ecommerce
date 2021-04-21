import "./css/index.css";
import "./css/App.css";
import { Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { Store } from "./pages/Store";
import { Wishlist } from "./pages/Wislist";
import { Cart } from "./pages/Cart";
import { Login } from "./pages/Login";
import { NavBar } from "./components/NavBar";
import { Snakbar } from "./components/Snakbar";
import { useSnakbarContext } from "./Context";
export default function App() {
  const { snakbarStatus } = useSnakbarContext();
  return (
    <main>
      <NavBar></NavBar>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/store" element={<Store />}></Route>
        <Route path="/wishlist" element={<Wishlist />}></Route>
        <Route path="/cart" element={<Cart />}></Route>
        <Route path="/login" element={<Login />}></Route>
      </Routes>
      {snakbarStatus["isShow"] === true && <Snakbar></Snakbar>}
    </main>
  );
}

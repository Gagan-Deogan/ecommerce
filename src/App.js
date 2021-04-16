import "./css/index.css";
import "./css/App.css";
import { Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { Explore } from "./pages/Explore";
import { Wishlist } from "./pages/Wislist";
import { Cart } from "./pages/Cart";
import { NavBar } from "./components/NavBar/NavBar";
import { Snakbar } from "./components/Shared/Snakbar";
import { useSnakbarContext } from "./Context";
export default function App() {
  const { snakbarStatus } = useSnakbarContext();
  return (
    <main className="row">
      <NavBar></NavBar>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/explore" element={<Explore />}></Route>
        <Route path="/wishlist" element={<Wishlist />}></Route>
        <Route path="/cart" element={<Cart />}></Route>
      </Routes>
      {snakbarStatus["isShow"] === true && <Snakbar></Snakbar>}
    </main>
  );
}

import "./css/index.css";
import { Routes, Route } from 'react-router-dom';
import { Home } from './components/home/Home';
import { Explore } from './components/Explore/Explore';
import { WishList } from './components/wislist/WishList';
import { Cart } from './components/cart/Cart';
import { NavBar } from './components/NavBar/NavBar';
import { Snakbar } from "./components/Shared/Snakbar";
import { useSnakbar } from "./components/Context/SnakbarContext";
export default function App() {
  const { snakbarStatus } = useSnakbar()
  return (
    <main className="row">
      <NavBar></NavBar>
      <section className="col" >
        <Routes>
          <Route path="/" element={<Home/>} ></Route>
          <Route path="/explore" element={ <Explore/> } ></Route>
          <Route path="/wishlist" element={ <WishList/> } ></Route>
          <Route path="/cart" element={ <Cart/> } ></Route>
        </Routes>
        {snakbarStatus["isShow"] === true && <Snakbar></Snakbar>}
      </section>
    </main>
  );
}

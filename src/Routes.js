import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Explore } from "./components/Explore/Explore";
import { Home } from "./components/home/Home";
import { Cart } from "./components/cart/Cart";
import { WishList } from "./components/wislist/WishList";
import { NavBar } from "./components/NavBar/NavBar";
import { Snakbar } from "./components/Shared/Snakbar";
import { useSnakbar } from "./components/Context/SnakbarContext";
import "./css/spinner.css";
export const Routes = () => {
    const { snakbarStatus } = useSnakbar()
    return (
    <Router>
        <main className="row">
            <NavBar/>
            <section className="col" >
                <Switch>
                    <Route exact path="/">
                        <Home />
                    </Route>
                    <Route exact path="/explore">
                        <Explore/>
                    </Route>
                    <Route exact path="/cart">
                        <Cart />
                    </Route>
                    <Route exact path="/wishlist">
                        <WishList />
                    </Route>
                </Switch>
                {snakbarStatus["isShow"] === true && <Snakbar></Snakbar>}
            </section>
        </main>
    </Router>);
};

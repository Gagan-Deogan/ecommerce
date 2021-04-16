import React from "react";
import { HomeIcon } from "../../assests";
import { CartIcon } from "../../assests";
import { ExploreIcon } from "../../assests";
import { WishlistIcon } from "../../assests";
import { useCartContext } from "../../Context";
import { NavLink } from "react-router-dom";
import "./navbar.css";
export const NavBar = () => {
  const { cartList, wishList } = useCartContext();
  return (
    <nav className="column align-center box-shd">
      <NavLink
        end
        to={{ pathname: "/" }}
        className="btn-link margin-t-64"
        activeStyle={{ background: "var(--background)" }}>
        <HomeIcon />
      </NavLink>
      <NavLink
        to={{ pathname: "/explore" }}
        className="btn-link margin-t-16"
        activeStyle={{ background: "var(--background)" }}>
        <ExploreIcon />
      </NavLink>
      <NavLink
        to={{ pathname: "/wishlist" }}
        className="btn-link margin-t-16"
        activeStyle={{ background: "var(--background)" }}>
        <WishlistIcon />
        {!!wishList.length && <span class="badge">{wishList.length}</span>}
      </NavLink>
      <NavLink
        to={{ pathname: "/cart" }}
        className="btn-link margin-t-16"
        activeStyle={{ background: "var(--background)" }}>
        <CartIcon />
        {!!cartList.length && <span class="badge">{cartList.length}</span>}
      </NavLink>
    </nav>
  );
};

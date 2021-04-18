import React from "react";
import {
  HomeIcon,
  CartIcon,
  BagIcon,
  WishlistIcon,
  UserIcon,
  Logo,
} from "../../assests";

import { useCartContext } from "../../Context";
import { NavLink, useLocation } from "react-router-dom";
import "./navbar.css";
import { Hidden } from "../Hidden";
const NavOption = ({ name, navTo, icon, badge, isVerticla }) => {
  return (
    <li>
      <NavLink
        to={navTo}
        end={navTo}
        className={`btn-link ${
          isVerticla
            ? "justify-start margin-t-16 margin-l-16 margin-r-16 margin-b-16"
            : "column justify-center algin-center"
        } `}
        activeStyle={{
          color: "var(--primary-default)",
        }}>
        {icon}
        {!!badge && <span class="badge">{badge}</span>}
        <h6 className={`"margin-t-4 font-xs text-center"`}>{name}</h6>
      </NavLink>
    </li>
  );
};

export const NavBar = () => {
  const { cartList, wishList } = useCartContext();
  const loaction = useLocation();
  return (
    <nav className="row padding-l-16 padding-r-16">
      <div className="row sm-w2 w12 justify-start align-center">
        <Logo />
      </div>
      <Hidden hideAt="md">
        <ul className="row sm-w8 w12 justify-evenly align-center ">
          <NavOption
            navTo="/"
            icon={
              <HomeIcon
                color={loaction.pathname === "/" ? "#25a18a" : "#6b7280"}
              />
            }
            name="Home"></NavOption>
          <NavOption
            navTo="/store"
            icon={
              <BagIcon
                color={loaction.pathname === "/store" ? "#25a18a" : "#6b7280"}
              />
            }
            name="Store"></NavOption>
          <NavOption
            navTo="/wishlist"
            icon={
              <WishlistIcon
                color={
                  loaction.pathname === "/wishlist" ? "#25a18a" : "#6b7280"
                }
              />
            }
            name="Wishlist"
            badge={wishList.length}></NavOption>
          <NavOption
            navTo="/cart"
            icon={
              <CartIcon
                color={loaction.pathname === "/cart" ? "#25a18a" : "#6b7280"}
              />
            }
            name="Cart"
            badge={cartList.length}></NavOption>
        </ul>
        <ul className="row sm-w2 w12 justify-end align-center">
          <NavOption
            navTo="/login"
            icon={
              <UserIcon
                color={loaction.pathname === "/login" ? "#25a18a" : "#6b7280"}
              />
            }
            name="Login"
            isVerticla
            badge={cartList.length}></NavOption>
        </ul>
      </Hidden>
    </nav>
  );
};

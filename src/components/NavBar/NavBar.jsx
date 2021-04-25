import { useState } from "react";
import {
  HomeIcon,
  CartIcon,
  BagIcon,
  WishlistIcon,
  UserIcon,
  Logo,
  HamburgerIcon,
} from "../../assests";
import { Avatar } from "../Avatar";
import { Model } from "../Model";
import { useCartContext, useAuthContext } from "../../Context";
import { NavLink, useLocation } from "react-router-dom";
import "./navbar.css";
import { Hidden } from "../Hidden";
const NavOption = ({
  name,
  navTo,
  icon,
  badge,
  isVertical,
  TitleClasses = "",
  ...props
}) => {
  return (
    <li {...props}>
      <NavLink
        to={navTo}
        end={navTo}
        className={`btn-link ${
          isVertical
            ? "justify-start algin-start margin-t-16 margin-l-16 margin-r-16 margin-b-16"
            : "column justify-center algin-center"
        } `}
        activeStyle={{
          color: "var(--primary-default)",
        }}>
        {icon}
        {!!badge && <span className="badge">{badge}</span>}
        <h4 className={`${TitleClasses} text-center"`}>{name}</h4>
      </NavLink>
    </li>
  );
};

export const NavBar = () => {
  const { cartList, wishList } = useCartContext();
  const { user } = useAuthContext();
  const loaction = useLocation();
  const [isOpenModel, setIsOpenModel] = useState(false);
  const { REACT_APP_IMAGE_URL } = process.env;
  return (
    <nav className="row padding-l-16 padding-r-16 align-center">
      <div className="row sm-w6 w12 justify-start align-center">
        <Logo />
      </div>
      <Hidden hideAt="sm-down">
        <ul className="row sm-w8 w12 justify-evenly align-center ">
          <NavOption
            navTo="/"
            TitleClasses="margin-t-4 font-xs"
            icon={
              <HomeIcon
                color={loaction.pathname === "/" ? "#61973f" : "#6b7280"}
              />
            }
            name="Home"></NavOption>
          <NavOption
            navTo="/store"
            TitleClasses="margin-t-4 font-xs"
            icon={
              <BagIcon
                color={loaction.pathname === "/store" ? "#61973f" : "#6b7280"}
              />
            }
            name="Store"></NavOption>
          <NavOption
            navTo="/wishlist"
            TitleClasses="margin-t-4 font-xs"
            icon={
              <WishlistIcon
                color={
                  loaction.pathname === "/wishlist" ? "#61973f" : "#6b7280"
                }
              />
            }
            name="Wishlist"
            badge={wishList.length}></NavOption>
          <NavOption
            navTo="/cart"
            TitleClasses="margin-t-4 font-xs"
            icon={
              <CartIcon
                color={loaction.pathname === "/cart" ? "#61973f" : "#6b7280"}
              />
            }
            name="Cart"
            badge={cartList.length}></NavOption>
        </ul>
        <ul className="row sm-w2 w12 justify-end align-center">
          {user ? (
            <NavLink to="/profile">
              <Avatar
                image={REACT_APP_IMAGE_URL + user.image}
                name={user.name}
              />
            </NavLink>
          ) : (
            <NavOption
              navTo="/login"
              TitleClasses="margin-t-4 font-xs"
              icon={
                <UserIcon
                  color={loaction.pathname === "/login" ? "#61973f" : "#6b7280"}
                />
              }
              name="Login"
              isVertical></NavOption>
          )}
        </ul>
      </Hidden>
      <Hidden hideAt="sm-up">
        <div className="row sm-w6 w12 justify-end align-center">
          <button className="btn-link" onClick={() => setIsOpenModel(true)}>
            <HamburgerIcon />
          </button>
          <ul>
            <NavOption
              navTo="/cart"
              TitleClasses="hide"
              onClick={() => setIsOpenModel(false)}
              icon={
                <CartIcon
                  color={loaction.pathname === "/cart" ? "#61973f" : "#6b7280"}
                />
              }
              name="Cart"
              badge={cartList.length}></NavOption>
          </ul>
        </div>
        <Model isOpenModel={isOpenModel} setIsOpenModel={setIsOpenModel}>
          <aside className="left-sheet column">
            <div className=" row w12 justify-start align-start padding-16 padding-l-32">
              <Logo />
            </div>

            <ul className="column w12 justify-evenly align-start ">
              <NavOption
                navTo="/"
                TitleClasses="margin-l-8"
                isVertical
                onClick={() => setIsOpenModel(false)}
                icon={
                  <HomeIcon
                    color={loaction.pathname === "/" ? "#61973f" : "#6b7280"}
                  />
                }
                name="Home"></NavOption>
              <NavOption
                navTo="/store"
                TitleClasses="margin-l-8"
                isVertical
                onClick={() => setIsOpenModel(false)}
                icon={
                  <BagIcon
                    color={
                      loaction.pathname === "/store" ? "#61973f" : "#6b7280"
                    }
                  />
                }
                name="Store"></NavOption>
              <NavOption
                navTo="/wishlist"
                TitleClasses="margin-l-8"
                isVertical
                onClick={() => setIsOpenModel(false)}
                icon={
                  <WishlistIcon
                    color={
                      loaction.pathname === "/wishlist" ? "#61973f" : "#6b7280"
                    }
                  />
                }
                name="Wishlist"
                badge={wishList.length}></NavOption>
            </ul>
            {user && (
              <div className="row padding-16">
                <Avatar
                  image={REACT_APP_IMAGE_URL + user.image}
                  name={user.name}
                />
                <div className="column margin-l-8">
                  <h5 className="bold">{user.name}</h5>
                  <h6 className="primary-color">View Profile</h6>
                </div>
              </div>
            )}
          </aside>
        </Model>
      </Hidden>
    </nav>
  );
};

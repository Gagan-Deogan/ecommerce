import "./navbar.css";
import { useCartAndWishlist } from "context/CartAndWishlistProvider";
import { NavLink } from "react-router-dom";
import { Logo } from "assests/icons";
import { Hidden } from "../Hidden";
import { MobNavOptions } from "./MobNavOptions";
import { NavOptions } from "./NavOptions";

export const NavBar = () => {
  const {
    cartDetails: { cartItems },
    wishlist,
  } = useCartAndWishlist();

  return (
    <nav className="row padding-l-16 padding-r-16 align-center">
      <div className="row sm-w6 w4 justify-start align-center">
        <NavLink to="/">
          <Logo />
        </NavLink>
      </div>
      <Hidden hideAt="sm-down">
        <NavOptions
          productIncart={cartItems.length}
          productInWishlist={wishlist.length}
        />
      </Hidden>
      <Hidden hideAt="sm-up">
        <MobNavOptions
          productIncart={cartItems.length}
          productInWishlist={wishlist.length}
        />
      </Hidden>
    </nav>
  );
};

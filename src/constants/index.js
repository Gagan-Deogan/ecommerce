import {
  HomeIcon,
  CartIcon,
  BagIcon,
  WishlistIcon,
  OrderIcon,
  UserIcon,
} from "assests/icons";

export const activeStyle = {
  color: "var(--primary-default)",
};
export const navOptions = {
  Home: { link: "/", icon: <HomeIcon /> },
  Store: {
    link:
      "/store?&showInvertory=true&showOffer=false&showNew=false&showNew=false",
    icon: <BagIcon />,
  },
  Wishlist: { link: "/wishlist", icon: <WishlistIcon />, badge: 0 },
  Cart: { link: "/cart", icon: <CartIcon />, badge: 0 },
};
export const publicOptions = {
  Home: { link: "/", icon: <HomeIcon /> },
  Store: {
    link:
      "/store?&showInvertory=true&showOffer=false&showNew=false&showNew=false",
    icon: <BagIcon />,
  },
  Login: { link: "/Login", icon: <UserIcon /> },
};
export const privateOptions = {
  Home: { link: "/", icon: <HomeIcon /> },
  Store: {
    link:
      "/store?&showInvertory=true&showOffer=false&showNew=false&showNew=false",
    icon: <BagIcon />,
  },
  "My Orders": { link: "/my/orders", icon: <OrderIcon /> },
};

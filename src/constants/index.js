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

export const homeSectionsData = {
  bestSellers: {
    title: "Deal of the Day",
    subtitle:
      "All of this is available at a quite reasonable price so that everyone can have their own glorious and lush plants set-up at their loving abode.",
    link: `/store?&showInvertory=true&showOffer=true&showNew=false&showBestSeller=false`,
  },
  bestDeals: {
    title: "Best Sellers",
    subtitle:
      "All of this is available at a quite reasonable price so that everyone can have their own glorious and lush plants set-up at their loving abode.",
    link: `/store?showInvertory=true&showOffer=false&showNew=false&showBestSeller=true`,
  },
  plants: {
    title: "Plants",
    subtitle:
      "All of this is available at a quite reasonable price so that everyone can have their own glorious and lush plants set-up at their loving abode.",
    link: `/store?category="607d20d2ebcbc4055460af6f"&showInvertory=true&showOffer=false&showNew=false&showBestSeller=false`,
  },
  tools: {
    title: "Tools",
    subtitle:
      "All of this is available at a quite reasonable price so that everyone can have their own glorious and lush plants set-up at their loving abode.",
    link: `/store?category="607d5210ebcbc4055460af75"&showInvertory=true&showOffer=false&showNew=false&showBestSeller=false`,
  },
};

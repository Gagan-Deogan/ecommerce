import { useReducer, createContext, useContext, useEffect } from "react";
import { useAuth } from "../AuthProvider";
import { reducer, intialState } from "./reducer";
import { request } from "utils";
const CartAndWishlistcontext = createContext();

export const CartAndWishlistProvider = ({ children }) => {
  const [cartAndWishlist, cartAndWishlistDispatch] = useReducer(
    reducer,
    intialState
  );
  const { user, token } = useAuth();

  useEffect(() => {
    if (user && token) {
      (async () => {
        const res = await request("get", "/carts");
        if ("data" in res) {
          const { cartItems, wishlist } = res.data;
          cartAndWishlistDispatch({
            type: "LOAD_CART",
            payload: {
              cartItems,
              wishlist,
            },
          });
        }
      })();
    } else {
      const loaclCartAndWishlist = JSON.parse(
        localStorage?.getItem("cartAndWishlist")
      );
      if (loaclCartAndWishlist) {
        const { cartItems, wishlist } = loaclCartAndWishlist;
        cartAndWishlistDispatch({
          type: "LOAD_CART",
          payload: { cartItems, wishlist },
        });
      }
    }
  }, [user, token]);

  useEffect(() => {
    if (!user) {
      localStorage?.setItem(
        "cartAndWishlist",
        JSON.stringify({
          cartItems: cartAndWishlist.cartDetails.cartItems,
          wishlist: cartAndWishlist.wishlist,
        })
      );
    }
  }, [user, cartAndWishlist]);

  return (
    <CartAndWishlistcontext.Provider
      value={{
        cartDetails: cartAndWishlist.cartDetails,
        wishlist: cartAndWishlist.wishlist,
        cartAndWishlistDispatch,
      }}>
      {children}
    </CartAndWishlistcontext.Provider>
  );
};

export const useCartAndWishlist = () => {
  return useContext(CartAndWishlistcontext);
};

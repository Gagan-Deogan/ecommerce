import { useReducer, createContext, useContext, useEffect } from "react";
import { useRequest } from "utils";
import { useAuth } from "../AuthProvider";
import { reducer, intialState } from "./reducer";

const CartAndWishlistContext = createContext();

export const CartAndWishlistProvider = ({ children }) => {
  const [cartAndWishlist, cartAndWishlistDispatch] = useReducer(
    reducer,
    intialState
  );
  const { user, token } = useAuth();
  const { request } = useRequest();

  useEffect(() => {
    if (user && token) {
      (async () => {
        const res = await request({
          method: "GET",
          endpoint: `/carts`,
        });
        if (res && res.success) {
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
    <CartAndWishlistContext.Provider
      value={{
        cartDetails: cartAndWishlist.cartDetails,
        wishlist: cartAndWishlist.wishlist,
        cartAndWishlistDispatch,
      }}>
      {children}
    </CartAndWishlistContext.Provider>
  );
};

export const useCartAndWishlist = () => {
  return useContext(CartAndWishlistContext);
};

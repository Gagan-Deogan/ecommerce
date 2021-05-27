import { useReducer, createContext, useContext, useEffect } from "react";
import { useRequest } from "utils";
import { useAuthContext } from "../AuthContext";
import { reducer } from "./reducer";

const CartAndWishlistContext = createContext();
const intialState = {
  cartDetails: {
    cartItems: [],
    totalEffectivePrice: 0,
    totalDiscount: 0,
    totalPrice: 0,
  },
  wishlist: [],
};

export const CartAndWishlistProvider = ({ children }) => {
  const [cartAndWishlist, cartAndWishlistDispatch] = useReducer(
    reducer,
    intialState
  );
  const { user, token } = useAuthContext();
  const { request } = useRequest();

  useEffect(() => {
    if (user) {
      (async () => {
        const res = await request({
          method: "GET",
          endpoint: `/carts`,
        });
        if (res && res.success) {
          cartAndWishlistDispatch({
            type: "LOAD_CART",
            payload: {
              cartAndWishlist: {
                cartDetails: { cartItems: res.data },
                wishlist: [],
              },
            },
          });
        }
      })();
    } else {
      const loaclCartAndWishlist = JSON.parse(
        localStorage?.getItem("cartAndWishlist")
      );
      if (loaclCartAndWishlist) {
        cartAndWishlistDispatch({
          type: "LOAD_CART",
          payload: { cartAndWishlist: loaclCartAndWishlist },
        });
      }
    }
  }, [user, token]);

  useEffect(() => {
    if (!!!user) {
      localStorage?.setItem("cartAndWishlist", JSON.stringify(cartAndWishlist));
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

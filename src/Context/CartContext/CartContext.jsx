import { useReducer, createContext, useContext, useEffect } from "react";
import { debouncing, useRequest } from "../../utils";
import { useSnakbarContext } from "../SnakbarContext";
import { useAuthContext } from "../AuthContext";
import { reducer } from "./reducer";
const CartContext = createContext();

const intialState = { cartlist: [], wishlist: [] };

export const CartContextProvider = ({ children }) => {
  const [{ cartlist, wishlist }, cartDispatch] = useReducer(
    reducer,
    intialState
  );
  const { snakbarDispatch } = useSnakbarContext();
  const { user, token } = useAuthContext();
  const { request } = useRequest();

  const handleAddToCart = async ({ product }) => {
    if (user) {
      const res = await request({
        method: "POST",
        endpoint: `/carts/${product._id}`,
      });
      if (res && res.success) {
        cartDispatch({ type: "ADD_TO_CART", payload: product });
        snakbarDispatch({ type: "SUCCESS", payload: "Added To Cart" });
      }
    } else {
      cartDispatch({ type: "ADD_TO_CART", payload: product });
      snakbarDispatch({ type: "SUCCESS", payload: "Added To Cart" });
    }
  };

  const handleRemoveFromCart = async (id) => {
    if (user) {
      const res = await request({
        method: "DELETE",
        endpoint: `/carts/${id}`,
      });
      if (res && res.success) {
        cartDispatch({ type: "REMOVE_FROM_CART", payload: id });
        snakbarDispatch({
          type: "ERROR",
          payload: "Product Remove Succesfully",
        });
      }
    } else {
      cartDispatch({ type: "REMOVE_FROM_CART", payload: id });
      snakbarDispatch({ type: "ERROR", payload: "Product Remove Succesfully" });
    }
  };

  const handleQuantityChange = async ({ type, id, quantity }) => {
    if (user) {
      const res = await request({
        method: "PUT",
        endpoint: `/carts/${id}`,
        body: {
          quantity: type === "INCREMENT_QUANTITY" ? quantity + 1 : quantity - 1,
        },
      });
      if (res && res.success) {
        cartDispatch({ type: type, payload: id });
      }
    } else {
      cartDispatch({ type: type, payload: id });
    }
  };
  const betterHandleQuantityChange = debouncing(handleQuantityChange, 500);

  const handleSaveForLater = async ({ product }) => {
    if (user) {
      const res = await request({
        method: "DELETE",
        endpoint: `/carts/${product._id}`,
      });
      if (res && res.success) {
        cartDispatch({ type: "SAVE_FOR_LATER", payload: product });
        snakbarDispatch({
          type: "DEFAULT",
          payload: "Product Added to Wishlist",
        });
      }
    } else {
      cartDispatch({ type: "SAVE_FOR_LATER", payload: product });
    }
  };

  const setCartAndWish = ({ cartlist = [], wishlist = [] }) => {
    cartDispatch({
      type: "SET_CART",
      payload: { cartlist, wishlist },
    });
  };

  const priceReducer = (acc, value) => {
    return {
      totalEffectivePrice:
        acc.totalEffectivePrice + value.details.effectivePrice * value.quantity,
      totalDiscount:
        acc.totalDiscount +
        (value.details.price - value.details.effectivePrice) * value.quantity,
      totalPrice: acc.totalPrice + value.details.price * value.quantity,
    };
  };

  const { totalEffectivePrice, totalDiscount, totalPrice } = cartlist.reduce(
    priceReducer,
    {
      totalEffectivePrice: 0,
      totalDiscount: 0,
      totalPrice: 0,
    }
  );

  useEffect(() => {
    if (user && token) {
      (async () => {
        const res = await request({
          method: "GET",
          endpoint: `/carts`,
        });
        if (res && res.success) {
          setCartAndWish({ cartlist: res.data, loaclWish: [] });
        }
      })();
    } else {
      const loaclCart = JSON.parse(localStorage?.getItem("cartlist"));
      const loaclWish = JSON.parse(localStorage?.getItem("wishlist"));
      if (loaclCart || loaclWish) {
        setCartAndWish({ cartlist: loaclCart, wishlist: loaclWish });
      }
    }
  }, [user, token]);

  useEffect(() => {
    if (!!!user) {
      localStorage?.setItem("cartlist", JSON.stringify(cartlist));
    }
  }, [user, cartlist]);
  useEffect(() => {
    localStorage?.setItem("wishlist", JSON.stringify(wishlist));
  }, [user, wishlist]);

  return (
    <CartContext.Provider
      value={{
        cartlist: cartlist,
        wishlist: wishlist,
        handleAddToCart: handleAddToCart,
        handleRemoveFromCart,
        betterHandleQuantityChange,
        handleSaveForLater,
        totalPrice,
        totalEffectivePrice,
        totalDiscount,
        cartDispatch,
      }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCartContext = () => {
  return useContext(CartContext);
};

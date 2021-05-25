import { useReducer, createContext, useContext, useEffect } from "react";
import { useDebouncing, useRequest } from "../../utils";
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
  const { user } = useAuthContext();
  const { request } = useRequest();

  const handleWishList = ({ product, inWishlist }) => {
    const wishType = inWishlist ? "REMOVE_FROM_WISHLIST" : "ADD_TO_WISHLIST";
    const wishPayload = inWishlist ? product : product;
    const sankbarMsg = inWishlist
      ? "Succesfull Removed from Wishlist"
      : "Succesfull Added to Wishlist ";
    cartDispatch({ type: wishType, payload: wishPayload });
    snakbarDispatch({ type: "DEFAULT", payload: sankbarMsg });
  };
  const betterHandleWishList = useDebouncing(handleWishList, 500);

  const handleAddToCart = async ({ product }) => {
    if (user) {
      const { success } = await request({
        method: "POST",
        endpoint: `/carts/${user._id}/${product._id}`,
      });
      if (success) {
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
      const { success } = await request({
        method: "DELETE",
        endpoint: `/carts/${user._id}/${id}`,
      });
      if (success) {
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
      const { success } = await request({
        method: "PUT",
        endpoint: `/carts/${user._id}/${id}`,
        body: {
          quantity: type === "INCREMENT_QUANTITY" ? quantity + 1 : quantity - 1,
        },
      });
      if (success) {
        cartDispatch({ type: type, payload: id });
      }
    } else {
      cartDispatch({ type: type, payload: id });
    }
  };
  const betterHandleQuantityChange = useDebouncing(handleQuantityChange, 500);

  const handleSaveForLater = async ({ product }) => {
    if (user) {
      const { success } = await request({
        method: "DELETE",
        endpoint: `/carts/${user._id}/${product._id}`,
      });
      if (success) {
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
    if (user) {
      (async () => {
        const { success, data } = await request({
          method: "GET",
          endpoint: `/carts/${user._id}`,
        });
        if (success) {
          setCartAndWish({ cartlist: data, loaclWish: [] });
        }
      })();
    } else {
      const loaclCart = JSON.parse(localStorage?.getItem("cartlist"));
      const loaclWish = JSON.parse(localStorage?.getItem("wishlist"));
      if (loaclCart || loaclWish) {
        setCartAndWish({ cartlist: loaclCart, wishlist: loaclWish });
      }
    }
  }, [user]);

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
        betterHandleWishList: betterHandleWishList,
        handleWishList: handleWishList,
        handleAddToCart: handleAddToCart,
        handleRemoveFromCart,
        betterHandleQuantityChange,
        handleSaveForLater,
        totalPrice,
        totalEffectivePrice,
        totalDiscount,
      }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCartContext = () => {
  return useContext(CartContext);
};

import { useReducer, createContext, useContext, useEffect } from "react";
import { useDebouncing } from "../../Utils";
import { useSnakbarContext, useAuthContext } from "../";
import { reducer } from "./Utils";
import { useRequest } from "../../Utils/request";
const CartContext = createContext();

const intialState = { cartList: [], wishList: [] };

export const CartContextProvider = ({ children }) => {
  const [{ cartList, wishList }, cartDispatch] = useReducer(
    reducer,
    intialState
  );
  const { snakbarDispatch } = useSnakbarContext();
  const { user } = useAuthContext();
  const { request } = useRequest();
  const handleWishList = (product, inWishlist) => {
    const wishType = inWishlist ? "REMOVE_FROM_WISHLIST" : "ADD_TO_WISHLIST";
    const wishPayload = inWishlist ? product._id : product;
    const sankbarMsg = inWishlist
      ? "Succesfull Removed from Wishlist"
      : "Succesfull Added to Wishlist ";
    cartDispatch({ type: wishType, payload: wishPayload });
    snakbarDispatch({ type: "DEFAULT", payload: sankbarMsg });
  };

  const betterHandleWishList = useDebouncing(handleWishList, 500);

  const handleAddToCart = async (product) => {
    if (user) {
      const { success } = await request({
        method: "POST",
        endpoint: `/carts/${user._id}`,
        body: { productId: product._id },
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

  const handleRemoveFromCart = (id) => {
    cartDispatch({ type: "REMOVE_FROM_CART", payload: id });
    snakbarDispatch({ type: "ERROR", payload: "Product Remove Succesfully" });
  };

  const handleQuantityChange = (type, id) => {
    cartDispatch({ type: type, payload: id });
  };

  const handleSaveForLater = (product) => {
    cartDispatch({ type: "SAVE_FOR_LATER", payload: product });
  };

  const setCartAndWish = ({ loaclCart = [], loaclWish = [] }) => {
    cartDispatch({
      type: "SET_CART",
      payload: { cartList: loaclCart, wishList: loaclWish },
    });
  };

  const priceReducer = (acc, value) => {
    return {
      totalEffectivePrice:
        acc.totalEffectivePrice + value.details.effectivePrice,
      totalDiscount:
        acc.totalDiscount + value.details.price - value.details.effectivePrice,
      totalPrice: acc.totalPrice + value.details.price,
    };
  };

  const { totalEffectivePrice, totalDiscount, totalPrice } = cartList.reduce(
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
        const { success, products } = await request({
          method: "GET",
          endpoint: `/carts/${user._id}`,
        });
        if (success) {
          setCartAndWish({ loaclCart: products, loaclWish: [] });
        }
      })();
    } else {
      const loaclCart = JSON.parse(localStorage.getItem("cartlist"));
      const loaclWish = JSON.parse(localStorage.getItem("wishlist"));
      if (loaclCart || loaclWish) {
        setCartAndWish({ loaclCart, loaclWish });
      }
    }
  }, [user]);

  useEffect(() => {
    if (!!!user) {
      localStorage.setItem("cartlist", JSON.stringify(cartList));
    }
  }, [user, cartList]);
  useEffect(() => {
    if (!!!user) {
      localStorage.setItem("wishlist", JSON.stringify(wishList));
    }
  }, [user, wishList]);
  return (
    <CartContext.Provider
      value={{
        cartList: cartList,
        wishList: wishList,
        betterHandleWishList: betterHandleWishList,
        handleWishList: handleWishList,
        handleAddToCart: handleAddToCart,
        handleRemoveFromCart,
        handleQuantityChange,
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

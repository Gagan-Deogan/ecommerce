import { useReducer, createContext, useContext } from "react";
import { useDebouncing } from "../../Utils";
import { useSnakbarContext } from "../";
import { reducer } from "./Utils";
const CartContext = createContext();

const intialState = { cartList: [], wishList: [] };

export const CartContextProvider = ({ children }) => {
  const [{ cartList, wishList }, cartDispatch] = useReducer(
    reducer,
    intialState
  );
  const { snakbarDispatch } = useSnakbarContext();

  const handleWishList = (product) => {
    const wishType = product.inWish
      ? "REMOVE_FROM_WISHLIST"
      : "ADD_TO_WISHLIST";
    const wishPayload = product.inWish ? product._id : product;
    const sankbarMsg = product.inWish
      ? "Succesfull Removed from Wishlist"
      : "Succesfull Added to Wishlist ";
    cartDispatch({ type: wishType, payload: wishPayload });
    snakbarDispatch({ type: "DEFAULT", payload: sankbarMsg });
  };

  const betterHandleWishList = useDebouncing(handleWishList, 500);

  const handleAddToCart = (product) => {
    cartDispatch({ type: "ADD_TO_CART", payload: product });
    snakbarDispatch({ type: "SUCCESS", payload: "Added To Cart" });
  };

  return (
    <CartContext.Provider
      value={{
        cartList: cartList,
        wishList: wishList,
        cartDispatch: cartDispatch,
        betterHandleWishList: betterHandleWishList,
        handleAddToCart: handleAddToCart,
      }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCartContext = () => {
  return useContext(CartContext);
};

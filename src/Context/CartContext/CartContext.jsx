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

  const priceReducer = (acc, value) => {
    // const discountedPrice = value.price - value.discount * value.price;
    return {
      totalEffectivePrice: acc.totalEffectivePrice + value.effectivePrice,
      totalDiscount: acc.totalDiscount + value.price - value.effectivePrice,
      totalPrice: acc.totalPrice + value.price,
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

  return (
    <CartContext.Provider
      value={{
        cartList: cartList,
        wishList: wishList,
        betterHandleWishList: betterHandleWishList,
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

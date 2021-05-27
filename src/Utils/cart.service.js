import { debouncing } from "./Debouncing";

const handleWishList = ({
  cartDispatch,
  snakbarDispatch,
  product,
  sankbarMsg,
}) => {
  cartDispatch({
    type: "TOOGLE_PRODUCT_FROM_WISHLIST",
    payload: { product: product },
  });
  snakbarDispatch({ type: "DEFAULT", payload: sankbarMsg });
};
export const betterHandleWishList = debouncing(handleWishList, 500);

export const handleAddToCart = async ({
  user,
  product,
  cartDispatch,
  snakbarDispatch,
  request,
}) => {
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

const handleQuantityChange = async ({
  user,
  type,
  productId,
  quantity,
  cartDispatch,
  request,
}) => {
  if (user) {
    const res = await request({
      method: "PUT",
      endpoint: `/carts/${productId}`,
      body: {
        quantity: type === "INCREMENT_QUANTITY" ? quantity + 1 : quantity - 1,
      },
    });
    if (res && res.success) {
      cartDispatch({ type: type, payload: productId });
    }
  } else {
    cartDispatch({ type: type, payload: productId });
  }
};
export const betterHandleQuantityChange = debouncing(handleQuantityChange, 500);

export const handleRemoveFromCart = async ({
  productId,
  user,
  cartDispatch,
  snakbarDispatch,
  request,
}) => {
  if (user) {
    const res = await request({
      method: "DELETE",
      endpoint: `/carts/${productId}`,
    });
    if (res && res.success) {
      cartDispatch({ type: "REMOVE_FROM_CART", payload: productId });
      snakbarDispatch({
        type: "ERROR",
        payload: "Product Remove Succesfully",
      });
    }
  } else {
    cartDispatch({ type: "REMOVE_FROM_CART", payload: productId });
    snakbarDispatch({ type: "ERROR", payload: "Product Remove Succesfully" });
  }
};
export const handleSaveForLater = async ({
  product,
  user,
  cartDispatch,
  snakbarDispatch,
  request,
}) => {
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

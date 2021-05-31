export const handleWishList = async ({
  user,
  product,
  cartAndWishlistDispatch,
  snakbarDispatch,
  sankbarMsg,
  request,
}) => {
  if (user) {
    const res = await request({
      method: "POST",
      endpoint: `/wishlists/${product._id}`,
    });
    if (res?.success) {
      cartAndWishlistDispatch({
        type: "TOOGLE_PRODUCT_FROM_WISHLIST",
        payload: { product: product },
      });
      snakbarDispatch({ type: "DEFAULT", payload: sankbarMsg });
    }
  } else {
    cartAndWishlistDispatch({
      type: "TOOGLE_PRODUCT_FROM_WISHLIST",
      payload: { product: product },
    });
    snakbarDispatch({ type: "DEFAULT", payload: sankbarMsg });
  }
  return Promise.resolve();
};

export const handleAddToCart = async ({
  user,
  product,
  cartAndWishlistDispatch,
  snakbarDispatch,
  request,
}) => {
  if (user) {
    const res = await request({
      method: "POST",
      endpoint: `/carts/${product._id}`,
    });
    if (res && res.success) {
      cartAndWishlistDispatch({ type: "ADD_TO_CART", payload: { product } });
      snakbarDispatch({ type: "SUCCESS", payload: "Added To Cart" });
    }
  } else {
    cartAndWishlistDispatch({ type: "ADD_TO_CART", payload: { product } });
    snakbarDispatch({ type: "SUCCESS", payload: "Added To Cart" });
  }
  return Promise.resolve();
};

export const handleQuantityChange = async ({
  user,
  type,
  productId,
  quantity,
  cartAndWishlistDispatch,
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
      cartAndWishlistDispatch({ type: type, payload: { productId } });
    }
  } else {
    cartAndWishlistDispatch({ type: type, payload: { productId } });
  }
  return Promise.resolve();
};

export const handleRemoveFromCart = async ({
  product,
  user,
  cartAndWishlistDispatch,
  snakbarDispatch,
  request,
}) => {
  if (user) {
    const res = await request({
      method: "DELETE",
      endpoint: `/carts/${product._id}`,
    });
    if (res && res.success) {
      cartAndWishlistDispatch({
        type: "REMOVE_FROM_CART",
        payload: { product },
      });
      snakbarDispatch({
        type: "ERROR",
        payload: "Product Remove Succesfully",
      });
    }
  } else {
    cartAndWishlistDispatch({ type: "REMOVE_FROM_CART", payload: { product } });
    snakbarDispatch({ type: "ERROR", payload: "Product Remove Succesfully" });
  }
  return Promise.resolve();
};

export const handleSaveForLater = async ({
  product,
  user,
  cartAndWishlistDispatch,
  snakbarDispatch,
  request,
}) => {
  if (user) {
    const res = await request({
      method: "DELETE",
      endpoint: `/carts/${product._id}`,
    });
    if (res && res.success) {
      cartAndWishlistDispatch({ type: "SAVE_FOR_LATER", payload: { product } });
      snakbarDispatch({
        type: "DEFAULT",
        payload: "Product Added to Wishlist",
      });
    }
  } else {
    cartAndWishlistDispatch({ type: "SAVE_FOR_LATER", payload: { product } });
  }
  return Promise.resolve();
};

export const getProductWithFlags = ({ cartItems, wishlist, product }) => {
  const productsIdInCart = cartItems.map((item) => item.product._id);
  const productsIdInWishList = wishlist.map((product) => product._id);
  return {
    inCartlist: productsIdInCart.includes(product?._id),
    inWishlist: productsIdInWishList.includes(product?._id),
  };
};

export const getProductWithWishlistFlag = (cartItems, wishlist) => {
  const wishlistProductId = wishlist.map((product) => product._id);
  return cartItems.map((item) =>
    wishlistProductId.includes(item.product._id)
      ? { ...item, inWishlist: true }
      : item
  );
};

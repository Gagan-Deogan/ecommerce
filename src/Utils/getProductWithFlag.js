export const isInWishlist = (wishlist, productId) => {
  const inWishlist = wishlist.find((product) => product._id === productId);
  return !!inWishlist;
};

export const isInCart = (cartItems, productId) => {
  const seacrchedProduct = cartItems.find(
    (item) => item.product._id === productId
  );
  return !!seacrchedProduct;
};

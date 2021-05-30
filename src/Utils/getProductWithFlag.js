export const isProductInCartOrWishlist = ({ cartItems, wishlist, product }) => {
  const productsIdInCart = cartItems.map((item) => item.product._id);
  const productsIdInWishList = wishlist.map((product) => product._id);
  return {
    inCart: productsIdInCart.includes(product?._id),
    inWishlist: productsIdInWishList.includes(product?._id),
  };
};

export const getCartItemWithWishlistFlag = (cartItems, wishlist) => {
  const wishlistProductId = wishlist.map((product) => product._id);
  return cartItems.map((item) =>
    wishlistProductId.includes(item.product._id)
      ? { ...item, inWishlist: true }
      : item
  );
};

export const getProductsWithWishlistFlag = (products, wishlist) => {
  const wishlistProductId = wishlist.map((product) => product._id);
  return products.map((product) =>
    wishlistProductId.includes(product._id)
      ? { ...product, inWishlist: true }
      : product
  );
};

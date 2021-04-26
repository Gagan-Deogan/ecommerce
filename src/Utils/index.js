export { discountCalculator } from "./discountCalculator";
export { useDebouncing } from "./debouncing";
export { useQuery } from "./query";
export { useRequest } from "./request";
export const getProductWithFlags = ({ cartlist, wishlist, product }) => {
  const productsIdInCart = cartlist.map((item) => item.details._id);
  const productsIdInWishList = wishlist.map((item) => item.details._id);
  return {
    inCartlist: productsIdInCart.includes(product?._id),
    inWishlist: productsIdInWishList.includes(product?._id),
  };
};

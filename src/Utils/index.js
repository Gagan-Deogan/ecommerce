export { discountCalculator } from "./discountCalculator";
export { useDebouncing } from "./debouncing";
export { useQuery } from "./query";
export { useRequest } from "./request";
export const getProductWithFlags = ({ cartList, wishList, product }) => {
  const productsIdInCart = cartList.map((item) => item.details._id);
  const productsIdInWishList = wishList.map((item) => item.details._id);
  return {
    inCartlist: productsIdInCart.includes(product?._id),
    inWishlist: productsIdInWishList.includes(product?._id),
  };
};

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

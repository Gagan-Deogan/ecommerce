import { HeartIcon } from "assests/icons";
import { useAuth } from "context/AuthProvider";
import { useCartAndWishlist } from "context/CartAndWishlistProvider";
import { useSnakbar } from "context/SnakbarProvider";
import { request, debounce } from "utils";
const evalSnakbarStateForWishlistButtonAction = (inWishlist) => {
  return inWishlist
    ? { type: "ERROR", payload: "Product Removed" }
    : { type: "SUCCESS", payload: "Product Added" };
};
export const WishlistButton = ({ inWishlist, product, className }) => {
  const { user } = useAuth();
  const { cartAndWishlistDispatch } = useCartAndWishlist();
  const { snakbarDispatch } = useSnakbar();
  const toogleProductFromWishlist = async () => {
    snakbarDispatch(evalSnakbarStateForWishlistButtonAction(inWishlist));
    cartAndWishlistDispatch({
      type: "TOOGLE_PRODUCT_FROM_WISHLIST",
      payload: { product },
    });

    if (user) {
      const res = await request("post", `/wishlists/${product._id}`);
      if (!("data" in res)) {
        return cartAndWishlistDispatch({
          type: "TOOGLE_PRODUCT_FROM_WISHLIST",
          payload: { product },
        });
      }
    }
  };
  const betterToogleProductFromWishlist = debounce(toogleProductFromWishlist);

  return (
    <button
      className={`btn-link rounded ${className}`}
      onClick={betterToogleProductFromWishlist}>
      <HeartIcon fill={inWishlist} />
    </button>
  );
};

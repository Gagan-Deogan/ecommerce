import { HeartIcon } from "assests/icons";
import { useAuth } from "context/AuthProvider";
import { useCartAndWishlist } from "context/CartAndWishlistProvider";
import { useSnakbar } from "context/SnakbarProvider";
import { request, debounce } from "utils";
export const WishlistButton = ({ inWishlist, product, className }) => {
  const { user } = useAuth();
  const { cartAndWishlistDispatch } = useCartAndWishlist();
  const { snakbarDispatch } = useSnakbar();

  const toogleProductFromWishlist = async () => {
    const sankbarMsg = inWishlist
      ? "Product Remove Successfully"
      : "Product Added Successfully";
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
    snakbarDispatch({ type: "DEFAULT", payload: sankbarMsg });
  };
  const betterToogleProductFromWishlist = debounce(
    toogleProductFromWishlist,
    1000
  );

  return (
    <button
      className={`btn-link rounded ${className}`}
      onClick={betterToogleProductFromWishlist}>
      <HeartIcon fill={inWishlist} />
    </button>
  );
};

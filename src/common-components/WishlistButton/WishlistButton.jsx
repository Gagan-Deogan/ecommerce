import { HeartIcon } from "assests/icons";
import { useAuth } from "context/AuthProvider";
import { useCartAndWishlist } from "context/CartAndWishlistProvider";
import { request, debounce } from "utils";
export const WishlistButton = ({ inWishlist, product, className }) => {
  const { user } = useAuth();
  const { cartAndWishlistDispatch } = useCartAndWishlist();

  const toogleProductFromWishlist = async () => {
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

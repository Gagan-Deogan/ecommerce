import { StarIcon } from "../../assests";
import { FavFillIcon, FavIcon } from "../../assests";
import { discountCalculator } from "../../Utils/discountCalculator";
import { useDebouncing } from "../../Utils/Debouncing";
import { useCartContext } from "../../Context";
import { useSnakbarContext } from "../../Context";

export const ProductCard = ({
  product,
  inWislist = false,
  showAddToCart = true,
  showAddTOWishlist = true,
}) => {
  const { cartDispatch } = useCartContext();
  const { snakbarDispatch } = useSnakbarContext();
  const handleAddToCart = (product) => {
    cartDispatch({ type: "ADD_TO_CART", payload: product });
    snakbarDispatch({ type: "SUCCESS", payload: "Added To Cart" });
  };
  const handleWishList = (product) => {
    const wishType = product.inWish
      ? "REMOVE_FROM_WISHLIST"
      : "ADD_TO_WISHLIST";
    const wishPayload = product.inWish ? product.id : product;
    const sankbarMsg = product.inWish
      ? "Succesfull Removed from Wishlist"
      : "Succesfull Added to Wishlist";
    cartDispatch({ type: wishType, payload: wishPayload });
    snakbarDispatch({ type: "DEFAULT", payload: sankbarMsg });
  };
  const betterHandleWishList = useDebouncing(handleWishList, 500);
  return (
    <div className="column card pos-r hov-box-shd bor-rad-8 bor-sol">
      {!!product.label && (
        <div className="card-badge">
          <span>{product.label}</span>
        </div>
      )}
      <img src={product.image} className="w12 bor-rad-8 " alt={product.name} />
      <div className="column card-title">
        <h6 className="">{product.name} </h6>
        <div className="row align-center ">
          {product.discount ? (
            <>
              <h6 className="bold margin-r-4 ">
                {"Rs. " + discountCalculator(product.discount, product.price)}
              </h6>
              <h6 className="grey-color text-line-thro margin-l-4 font-xs">
                {"Rs. " + product.price}
              </h6>
              <h6 className="primary-clr margin-l-4 font-xs">
                {" "}
                {product.discount * 100 + " %Off"}
              </h6>
            </>
          ) : (
            <h5 className="bold margin-r-4 ">{"Rs. " + product.price}</h5>
          )}
        </div>
        {showAddToCart && (
          <button
            className={
              !product.inStock || product.inCart
                ? "sm-btn-pry-fil btn-dis"
                : "sm-btn-pry-fil"
            }
            onClick={() => handleAddToCart(product)}
            disabled={!product.inStock || product.inCart ? true : false}>
            {product.inCart
              ? "IN CART"
              : !product.inStock
              ? "SOLD OUT"
              : "ADD TO CART"}
          </button>
        )}
      </div>
      {showAddTOWishlist && (
        <button
          className="btn-icon card-wish"
          onClick={() => betterHandleWishList(product)}>
          {product.inWish ? <FavFillIcon /> : <FavIcon />}
        </button>
      )}
      <div className="card-ratg row">
        <h6 className="bold margin-r-4">{product.rating}</h6>
        <StarIcon />
      </div>
    </div>
  );
};

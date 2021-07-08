import { StarIcon } from "assests/icons";
import { WishlistButton } from "common-components/WishlistButton";
import { useCartAndWishlist } from "context/CartAndWishlistProvider";
import { isInWishlist } from "utils";

const { REACT_APP_IMAGE_URL } = process.env;
export const ProductCard = ({ product, handleProductDetail }) => {
  const { wishlist } = useCartAndWishlist();
  const {
    _id,
    label,
    image,
    name,
    discount,
    effectivePrice,
    price,
    rating,
    avalibility,
  } = product;

  const inWishlist = isInWishlist(wishlist, _id);
  const outofStockStyle = !avalibility && "out-of-stock-filter";
  return (
    <div className={`column card pos-r hov-box-shd bor-rad-8 bor-sol`}>
      <img
        src={REACT_APP_IMAGE_URL + image}
        className={`w12 bor-rad-8 cursor-pointer ${outofStockStyle}`}
        alt={name}
        onClick={() => handleProductDetail(_id)}
      />
      {!avalibility && (
        <span className="position-absolute out-of-stock-badge padding-4 bor-rad-4 font-xs">
          Out of Stock
        </span>
      )}
      {!!label && (
        <div className="card-badge">
          <span>{label}</span>
        </div>
      )}
      <div className="row padding-16 padding-l-8 padding-r-8 align-start">
        <div
          className="w11 cursor-pointer"
          onClick={() => handleProductDetail(_id)}>
          <h5>{name}</h5>
          <div className="row align-center">
            {!!discount && (
              <>
                <h5 className="bold">{"Rs. " + effectivePrice}</h5>
                <h6 className="grey-color text-line-thro margin-l-4 font-xs">
                  {"Rs. " + price}
                </h6>
                <h6 className="primary-color margin-l-4 font-xs">
                  {" "}
                  {discount + " %Off"}
                </h6>
              </>
            )}
            {!!!discount && (
              <h5 className="bold margin-r-4 ">{"Rs. " + effectivePrice}</h5>
            )}
          </div>
        </div>
        <WishlistButton inWishlist={inWishlist} product={product} />
      </div>
      {rating && (
        <div className="card-ratg">
          <span className="bold margin-r-4">{rating}</span>
          <StarIcon />
        </div>
      )}
    </div>
  );
};

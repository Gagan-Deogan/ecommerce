import { StarIcon } from "../../assests";
import { FavFillIcon, FavIcon } from "../../assests";
const { REACT_APP_IMAGE_URL } = process.env;
export const ProductCard = ({
  details,
  showAddToCart = true,
  showAddTOWishlist = true,
  inCartlist = false,
  inWishlist = false,
  betterHandleWishList,
  handleWishList,
  handleAddToCart,
}) => {
  return (
    <div className="column card pos-r hov-box-shd bor-rad-8 bor-sol">
      {!!details.label && (
        <div className="card-badge">
          <span>{details.label}</span>
        </div>
      )}
      <img
        src={REACT_APP_IMAGE_URL + details.image}
        className="w12 bor-rad-8 "
        alt={details.name}
      />
      <div className="column card-title">
        <h6 className="">{details.name} </h6>
        <div className="row align-center ">
          {details.discount ? (
            <>
              <h6 className="bold margin-r-4 ">
                {"Rs. " + details.effectivePrice}
              </h6>
              <h6 className="grey-color text-line-thro margin-l-4 font-xs">
                {"Rs. " + details.price}
              </h6>
              <h6 className="primary-clr margin-l-4 font-xs">
                {" "}
                {details.discount + " %Off"}
              </h6>
            </>
          ) : (
            <h5 className="bold margin-r-4 ">
              {"Rs. " + details.effectivePrice}
            </h5>
          )}
        </div>
        {showAddToCart && (
          <button
            className={`margin-t-16 sm-btn-pry-fil  ${
              !details.avalibility || inCartlist ? "btn-dis" : ""
            }`}
            onClick={() => handleAddToCart(details)}
            disabled={!details.avalibility || inCartlist ? true : false}>
            {inCartlist
              ? "IN CART"
              : !details.avalibility
              ? "SOLD OUT"
              : "ADD TO CART"}
          </button>
        )}
      </div>
      {showAddTOWishlist && (
        <button
          className="btn-icon card-wish"
          onClick={() => betterHandleWishList(details, inWishlist)}>
          {inWishlist ? <FavFillIcon /> : <FavIcon />}
        </button>
      )}
      {details.rating && (
        <div className="card-ratg row">
          <h6 className="bold margin-r-4">{details.rating}</h6>
          <StarIcon />
        </div>
      )}
    </div>
  );
};

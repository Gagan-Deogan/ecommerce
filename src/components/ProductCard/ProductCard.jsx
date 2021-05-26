import { StarIcon } from "../../assests/icons";
const { REACT_APP_IMAGE_URL } = process.env;
export const ProductCard = ({ details, handleProductDetail }) => {
  const {
    _id,
    label,
    image,
    name,
    discount,
    effectivePrice,
    price,
    rating,
  } = details;
  return (
    <div
      key="route"
      className="column card pos-r hov-box-shd bor-rad-8 bor-sol cursor-pointer"
      onClick={() => handleProductDetail(_id)}>
      {!!label && (
        <div className="card-badge">
          <span>{label}</span>
        </div>
      )}
      <img
        src={REACT_APP_IMAGE_URL + image}
        className="w12 bor-rad-8 "
        alt={name}
      />
      <div className="column card-title">
        <h6 className="">{name} </h6>
        <div className="row align-center ">
          {!!discount && (
            <>
              <h5 className="bold margin-r-4 ">{"Rs. " + effectivePrice}</h5>
              <h6 className="grey-color text-line-thro margin-l-4 font-xs">
                {"Rs. " + price}
              </h6>
              <h6 className="primary-clr margin-l-4 font-xs">
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
      {rating && (
        <div className="card-ratg">
          <span className="bold margin-r-4">{rating}</span>
          <StarIcon />
        </div>
      )}
    </div>
  );
};

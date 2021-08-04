import { AddIcon, SubtractIcon } from "assests/icons";

const { REACT_APP_IMAGE_URL } = process.env;

export const CartItem = ({
  item,
  handleRemoveFromCart,
  handleQuantityChange,
}) => {
  const {
    product: { _id, name, image, discount, effectivePrice, price },
    quantity,
  } = item;
  return (
    <li className="column  margin-t-16 border-bottom padding-b-8">
      <div className="row card card-vertical cart-card w12">
        <img
          src={REACT_APP_IMAGE_URL + image}
          className="bor-rad-4"
          alt={name}
        />
        <div className="column card-title margin-l-16">
          <h4>{name}</h4>
          <div className="row align-start  ">
            {discount ? (
              <>
                <h6 className="bold margin-r-4">{"Rs. " + effectivePrice}</h6>
                <h6 className="bold grey-color text-line-thro">
                  {" "}
                  {"Rs. " + price}
                </h6>
                <h6 className="primary-color margin-l-4 font-xs">
                  {" "}
                  {discount + " %Off"}
                </h6>
              </>
            ) : (
              <h6 className="bold margin-r-4 ">{"Rs. " + price}</h6>
            )}
          </div>
          <div className="row align-center margin-t-16 margin-b-16">
            <button
              className="btn-icon margin-r-8"
              onClick={() =>
                handleQuantityChange("DECREMENT_QUANTITY", _id, quantity)
              }>
              <SubtractIcon />
            </button>
            <h5>Quanitity {quantity}</h5>
            <button
              className="btn-icon margin-l-8"
              onClick={() =>
                handleQuantityChange("INCREMENT_QUANTITY", _id, quantity)
              }>
              <AddIcon />
            </button>
          </div>
        </div>
      </div>
      <div className="row margin-t-16">
        <button
          className="btn-link"
          onClick={() => handleRemoveFromCart(item.product)}>
          Remove from Cart
        </button>
      </div>
    </li>
  );
};

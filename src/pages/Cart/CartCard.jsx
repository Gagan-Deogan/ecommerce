import "./cart.css";
import { AddIcon, SubtractIcon } from "assests/icons";
import { useCartAndWishlist } from "Context/CartAndWishlistProvider";
import { betterHandleQuantityChange } from "utils";
import { useAuthContext } from "Context/AuthContext";
import { useRequest } from "utils";

const { REACT_APP_IMAGE_URL } = process.env;

export const CartCard = ({ product, inWishlist = false }) => {
  const { request } = useRequest();

  const {
    handleRemoveFromCart,
    handleSaveForLater,
    cartDispatch,
  } = useCartAndWishlist();
  const { user } = useAuthContext();
  const { _id, name, image, discount, effectivePrice, price } = product.details;
  const { quantity } = product;
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
                <h6 className="primary-clr margin-l-4 font-xs">
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
              onClick={() => {
                betterHandleQuantityChange({
                  type: "DECREMENT_QUANTITY",
                  productId: _id,
                  quantity: product.quantity,
                  request,
                  user,
                  cartDispatch,
                });
              }}>
              <SubtractIcon />
            </button>
            <h5>Quanitity {quantity}</h5>
            <button
              className="btn-icon margin-l-8"
              onClick={() =>
                betterHandleQuantityChange({
                  type: "DECREMENT_QUANTITY",
                  productId: _id,
                  quantity: product.quantity,
                  request,
                  user,
                  cartDispatch,
                })
              }>
              <AddIcon />
            </button>
          </div>
        </div>
      </div>
      <div className="row margin-t-16">
        <button className="btn-link" onClick={() => handleRemoveFromCart(_id)}>
          Remove from Cart
        </button>
        {!inWishlist && (
          <button
            className="btn-link margin-l-8"
            onClick={() => handleSaveForLater({ product: product.details })}>
            Save for later
          </button>
        )}
      </div>
    </li>
  );
};

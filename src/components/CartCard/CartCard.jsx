import { AddIcon, SubtractIcon } from "assests/icons";
import { useCartAndWishlist } from "Context/CartAndWishlistProvider";
import {
  betterHandleQuantityChange,
  handleRemoveFromCart,
  handleSaveForLater,
} from "services";
import { useAuth } from "Context/AuthProvider";
import { useSnakbar } from "Context/SnakbarProvider";
import { useRequest } from "utils";

const { REACT_APP_IMAGE_URL } = process.env;

export const CartCard = ({ item, inWishlist = false }) => {
  const { request } = useRequest();
  const { snakbarDispatch } = useSnakbar();
  const { cartAndWishlistDispatch } = useCartAndWishlist();
  const { user } = useAuth();
  const { _id, name, image, discount, effectivePrice, price } = item.product;
  const { quantity } = item;
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
              onClick={() => {
                betterHandleQuantityChange({
                  type: "DECREMENT_QUANTITY",
                  productId: _id,
                  quantity: quantity,
                  request,
                  user,
                  cartAndWishlistDispatch,
                });
              }}>
              <SubtractIcon />
            </button>
            <h5>Quanitity {quantity}</h5>
            <button
              className="btn-icon margin-l-8"
              onClick={() =>
                betterHandleQuantityChange({
                  type: "INCREMENT_QUANTITY",
                  productId: _id,
                  quantity: quantity,
                  request,
                  user,
                  cartAndWishlistDispatch,
                })
              }>
              <AddIcon />
            </button>
          </div>
        </div>
      </div>
      <div className="row margin-t-16">
        <button
          className="btn-link"
          onClick={() =>
            handleRemoveFromCart({
              product: item.product,
              user,
              cartAndWishlistDispatch,
              snakbarDispatch,
              request,
            })
          }>
          Remove from Cart
        </button>
        {!inWishlist && (
          <button
            className="btn-link margin-l-8"
            onClick={() =>
              handleSaveForLater({
                product: item.product,
                user,
                cartAndWishlistDispatch,
                snakbarDispatch,
                request,
              })
            }>
            Save for later
          </button>
        )}
      </div>
    </li>
  );
};

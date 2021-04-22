import React from "react";
import "./cart.css";
import { StarIcon } from "../../assests";
import { AddIcon } from "../../assests";
import { SubtractIcon } from "../../assests";
const { REACT_APP_IMAGE_URL } = process.env;
export const CartCard = ({
  product,
  handleRemoveFromCart,
  handleQuantityChange,
  handleSaveForLater,
}) => {
  return (
    <li className="row card card-vertical w12 cart-card margin-t-16">
      <img
        src={REACT_APP_IMAGE_URL + product.image}
        className="bor-rad-4"
        alt={product.name}
      />
      <div className="column card-title margin-l-16">
        <h4>{product.name}</h4>
        <div className="row align-start  ">
          {product.discount ? (
            <>
              <h6 className="bold margin-r-4">
                {"Rs. " + product.effectivePrice}
              </h6>
              <h6 className="bold grey-color text-line-thro">
                {" "}
                {"Rs. " + product.price}
              </h6>
              <h6 className="primary-clr margin-l-4 font-xs">
                {" "}
                {product.discount + " %Off"}
              </h6>
            </>
          ) : (
            <h6 className="bold margin-r-4 ">{"Rs. " + product.price}</h6>
          )}
        </div>
        <div className="row align-center margin-t-16 margin-b-16">
          <h5>Quanitity {product.quantity}</h5>
          <button
            className="btn-link margin-l-8"
            onClick={() => {
              handleQuantityChange("DECREMENT_QUANTITY", product._id);
            }}>
            <SubtractIcon />
          </button>
          <button
            className="btn-link margin-r-8"
            onClick={() =>
              handleQuantityChange("INCREMENT_QUANTITY", product._id)
            }>
            <AddIcon />
          </button>
        </div>
        <div className="row margin-t-16">
          <button
            className="sm-btn-pry"
            onClick={() => handleRemoveFromCart(product._id)}>
            Remove from Cart
          </button>
          {!product.inWish && (
            <button
              className="sm-btn-pry margin-l-8"
              onClick={() => handleSaveForLater(product)}>
              Save for later
            </button>
          )}
        </div>
      </div>
      <div className="card-ratg row">
        <h6 className="bold margin-r-4">{product.rating}</h6>
        <StarIcon />
      </div>
    </li>
  );
};

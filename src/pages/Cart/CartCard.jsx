import React from "react";
import "./cart.css";
import { StarIcon } from "../../assests";
import { AddIcon } from "../../assests";
import { SubtractIcon } from "../../assests";
import { discountCalculator } from "../../Utils/discountCalculator";
export const CartCard = ({
  product,
  handleRemoveFromCart,
  handleQuantityChange,
  handleSaveForLater,
}) => {
  return (
    <li className="row card row typ-vrt bor-sol cart-card w12">
      {product.label && (
        <div className="card-badge">
          <span>{product.label}</span>
        </div>
      )}
      <img src={product.image} className="w3 bor-rad-8" alt="" />
      <div className="column card-title eight">
        <h4>{product.name}</h4>
        <div className="row align-center ">
          {product.discount ? (
            <>
              <h5 className="bold margin-r-4 ">
                {"Rs. " + discountCalculator(product.discount, product.price)}
              </h5>
              <h6 className="bold gry txt-line-thro">
                {" "}
                {"Rs. " + product.price}
              </h6>
            </>
          ) : (
            <h5 className="bold margin-r-4 ">{"Rs. " + product.price}</h5>
          )}
        </div>
        <div className="row align-center margin-t-16 margin-b-16">
          <h5>Quanitity {product.quantity}</h5>
          <button
            className="btn-link margin-l-8"
            onClick={() => {
              handleQuantityChange("DECREMENT_QUANTITY", product.id);
            }}>
            <SubtractIcon />
          </button>
          <button
            className="btn-link margin-r-8"
            onClick={() =>
              handleQuantityChange("INCREMENT_QUANTITY", product.id)
            }>
            <AddIcon />
          </button>
        </div>
        <div className="row margin-t-16">
          <button
            className="sm-btn-pry"
            onClick={() => handleRemoveFromCart(product.id)}>
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

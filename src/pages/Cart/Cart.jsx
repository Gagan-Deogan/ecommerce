import React from "react";
import { useCartContext } from "../../Context";
import { CartCard } from "./CartCard.jsx";
export const Cart = () => {
  const {
    cartList,
    handleRemoveFromCart,
    handleQuantityChange,
    handleSaveForLater,
    totalPrice,
    totalEffectivePrice,
    totalDiscount,
  } = useCartContext();

  return (
    <>
      <section className="row justify-center align-start warp padding-t-16">
        <div className="column sm-w12 md-w8 w7 align-start justify-start bor-sol bor-rad-8 margin-r-16 margin-l-16">
          <div className="border-bottom w12 padding-16">
            <h4 className="bold">MY CART</h4>
          </div>
          <ul className="column w12 padding-16 padding-t-8">
            {cartList.map((product) => (
              <CartCard
                product={product}
                handleRemoveFromCart={handleRemoveFromCart}
                handleQuantityChange={handleQuantityChange}
                handleSaveForLater={handleSaveForLater}
                key={product._id}></CartCard>
            ))}
          </ul>
        </div>
        <div className="column sm-w12 md-w3 w3 align-center justify-start margin-r-16 margin-l-16 bor-sol bor-rad-8">
          <div className="border-bottom w12 padding-16">
            <h4 className="grey-color">PRICE DETAILS</h4>
          </div>
          <div className="w12 padding-16 border-bottom">
            <div className="w12 row justify-between ">
              <h5>Price({cartList.length} items )</h5>
              <h5>{totalPrice}</h5>
            </div>
            {!!totalDiscount && (
              <div className="w12 row justify-between margin-t-8">
                <h5>Discount</h5>
                <h5>{totalDiscount}</h5>
              </div>
            )}
          </div>
          <div className="w12 row padding-16 padding-b-8 justify-between ">
            <h4 className="bold">Total Amount</h4>
            <h4 className="bold">{totalEffectivePrice}</h4>
          </div>
          {!!totalDiscount && (
            <h6 className="primary-color bold margin-b-8">
              You will save ₹{totalDiscount} on this order
            </h6>
          )}
        </div>
      </section>
    </>
  );
};

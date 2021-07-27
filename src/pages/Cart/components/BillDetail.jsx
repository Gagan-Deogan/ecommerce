import { useCartAndWishlist } from "context/CartAndWishlistProvider";
import StripeCheckout from "react-stripe-checkout";
import { request } from "utils";
const { REACT_APP_STRIPE_KEY } = process.env;

export const BillDetail = () => {
  const {
    cartDetails: { cartItems, totalPrice, totalDiscount, totalEffectivePrice },
    cartAndWishlistDispatch,
  } = useCartAndWishlist();
  const handleToken = async (token) => {
    const res = await request("post", "/carts/checkout", {
      token,
      totalEffectivePrice,
    });
    if ("data" in res) {
      cartAndWishlistDispatch({ type: "CLEAR_CART" });
    }
  };
  return (
    <div className="column sm-w12 w3 align-center justify-start bor-sol bor-rad-8 price-container">
      <div className="border-bottom w12 padding-16">
        <h4 className="grey-color">Price Details</h4>
      </div>
      <div className="w12 padding-16 border-bottom">
        <div className="w12 row justify-between ">
          <h5>Price({cartItems.length} items )</h5>
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
      <StripeCheckout
        className="btn-pry-fil"
        amount={totalEffectivePrice * 100}
        stripeKey={REACT_APP_STRIPE_KEY}
        token={handleToken}
        currency="INR"
        zipCode={false}
        children={
          <button className="btn-pry-fil w12 margin-16">
            Pay ₹ {totalEffectivePrice}
          </button>
        }
      />
    </div>
  );
};

import "./cart.css";
import { useNavigate } from "react-router-dom";
import { useCartAndWishlist } from "Context/CartAndWishlistProvider";
import { CartCard } from "Components/CartCard";
import { BillDetail } from "Components/BillDetail";
// import { getCartItemWithWishlistFlag } from "utils";

export const Cart = () => {
  const {
    cartDetails: { cartItems },
  } = useCartAndWishlist();

  const navigate = useNavigate();
  return (
    <>
      <section className="row md-w12 w10 justify-center align-start sm-warp margin-t-16 padding-8  ">
        <div className="column sm-w12 w9 align-start justify-start bor-sol bor-rad-8">
          <div className="border-bottom w12 padding-16">
            <h4 className="bold">My Cart</h4>
          </div>
          {!!cartItems && (
            <ul className="column w12 padding-16 padding-t-8">
              {cartItems.map((item) => (
                <CartCard item={item} key={item._id}></CartCard>
              ))}
            </ul>
          )}
          {!cartItems.length && (
            <div className="column w12 align-center justify-center  padding-64">
              <h4>Your cart is empty!</h4>
              <h6>Add items to it now.</h6>
              <button
                className="btn-pry-fil margin-8"
                onClick={() => navigate("/store")}>
                Shop Now
              </button>
            </div>
          )}
        </div>
        {!!cartItems.length && <BillDetail />}
      </section>
    </>
  );
};

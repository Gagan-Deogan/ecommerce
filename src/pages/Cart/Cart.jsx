import { useCartContext } from "../../Context";
import { CartCard } from "./CartCard.jsx";
import { useNavigate } from "react-router-dom";

export const Cart = () => {
  const {
    cartlist,
    wishlist,
    handleRemoveFromCart,
    betterHandleQuantityChange,
    handleSaveForLater,
    totalPrice,
    totalEffectivePrice,
    totalDiscount,
  } = useCartContext();
  const getProductWithWishlistFlag = () => {
    const wishlistProductId = wishlist.map((product) => product.details._id);
    return cartlist.map((product) =>
      wishlistProductId.includes(product.details._id)
        ? { ...product, inWishlist: true }
        : product
    );
  };
  const productWithWishListFlag = getProductWithWishlistFlag();
  const navigate = useNavigate();
  return (
    <>
      <section className="row md-w12 w10 justify-center align-start sm-warp margin-t-16 padding-8  ">
        <div className="column sm-w12 w9 align-start justify-start bor-sol bor-rad-8">
          <div className="border-bottom w12 padding-16">
            <h4 className="bold">My Cart</h4>
          </div>
          {!!productWithWishListFlag.length && (
            <ul className="column w12 padding-16 padding-t-8">
              {productWithWishListFlag.map((product) => (
                <CartCard
                  product={product}
                  handleRemoveFromCart={handleRemoveFromCart}
                  betterHandleQuantityChange={betterHandleQuantityChange}
                  handleSaveForLater={handleSaveForLater}
                  inWishlist={product.inWishlist}
                  key={product._id}></CartCard>
              ))}
            </ul>
          )}
          {!!!productWithWishListFlag.length && (
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
        {!!productWithWishListFlag.length && (
          <div className="column sm-w12 w3 align-center justify-start bor-sol bor-rad-8 price-container">
            <div className="border-bottom w12 padding-16">
              <h4 className="grey-color">Price Details</h4>
            </div>
            <div className="w12 padding-16 border-bottom">
              <div className="w12 row justify-between ">
                <h5>Price({cartlist.length} items )</h5>
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
        )}
      </section>
    </>
  );
};

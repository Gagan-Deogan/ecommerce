import "./cart.css";
import { CartItem } from "./components/CartItem";
import { BillDetail } from "./components/BillDetail";
import { useCartAndWishlist } from "context/CartAndWishlistProvider";
import { useAuth } from "context/AuthProvider";
import { debounce, request } from "utils";
import { EmptyCart } from "./components/EmptyCart";
import { useSnakbar } from "context/SnakbarProvider";

export const Cart = () => {
  const {
    cartDetails: { cartItems },
    cartAndWishlistDispatch,
  } = useCartAndWishlist();
  const { snakbarDispatch } = useSnakbar();
  const { user } = useAuth();
  const handleRemoveFromCart = async (product) => {
    cartAndWishlistDispatch({ type: "REMOVE_FROM_CART", payload: { product } });
    snakbarDispatch({ type: "ERROR", payload: "Product Removed" });
    if (user) {
      const res = await request("delete", `/carts/${product._id}`);
      if (!("data" in res)) {
        return cartAndWishlistDispatch({
          type: "ADD_TO_CART",
          payload: { product },
        });
      }
    }
  };

  const handleQuantityChange = async (type, productId, quantity) => {
    if (quantity === 1 && type === "DECREMENT_QUANTITY") {
      return;
    }
    cartAndWishlistDispatch({ type: type, payload: { productId } });
    if (user) {
      const res = await request("put", `/carts/${productId}`, {
        quantity: type === "INCREMENT_QUANTITY" ? quantity + 1 : quantity - 1,
      });
      if (!("data" in res)) {
        cartAndWishlistDispatch({
          type:
            type === "INCREMENT_QUANTITY"
              ? "DECREMENT_QUANTITY"
              : "INCREMENT_QUANTITY",
          payload: { productId },
        });
      }
    }
  };

  const betterHandleQuantityChange = debounce(handleQuantityChange, 1000);
  const betterHandleRemoveFromCart = debounce(handleRemoveFromCart, 1000);
  return (
    <>
      <section className="row md-w12 w10 justify-center align-start sm-warp margin-t-16 padding-8  ">
        <div className="column sm-w12 w9 align-start justify-start bor-sol bor-rad-8">
          <div className="border-bottom w12 padding-16">
            <h4 className="bold">My Cart</h4>
          </div>
          {!!cartItems.length && (
            <ul className="column w12 padding-16 padding-t-8">
              {cartItems.map((item) => (
                <CartItem
                  item={item}
                  key={item._id}
                  handleRemoveFromCart={betterHandleRemoveFromCart}
                  handleQuantityChange={betterHandleQuantityChange}
                />
              ))}
            </ul>
          )}
          {!cartItems.length && <EmptyCart />}
        </div>
        {!!cartItems.length && <BillDetail />}
      </section>
    </>
  );
};

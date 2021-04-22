import React from "react";
import "./wishlist.css";
import { ProductCard } from "../../components/ProductCard/ProductCard";
import { useCartContext } from "../../Context";

export const Wishlist = () => {
  const {
    wishList,
    cartList,
    betterHandleWishList,
    handleAddToCart,
  } = useCartContext();
  const wishListWithFlag = (() => {
    const productsIdInCart = cartList.map((item) => item.id);
    return wishList.map((product) =>
      productsIdInCart.includes(product.id)
        ? { ...product, inCart: true }
        : product
    );
  })();
  return (
    <>
      <section className="column w12 align-start justify-start padding-32 padding-t-16">
        <ul className="dis-grid product-container wishlist-item margin-t-16 ">
          {wishListWithFlag.map((product) => (
            <ProductCard
              product={product}
              inWishList={true}
              betterHandleWishList={betterHandleWishList}
              handleAddToCart={handleAddToCart}></ProductCard>
          ))}
        </ul>
      </section>
    </>
  );
};

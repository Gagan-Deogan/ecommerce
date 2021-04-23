import React from "react";
import "./wishlist.css";
import { ProductCard } from "../../components/ProductCard/ProductCard";
import { useCartContext } from "../../Context";

export const Wishlist = () => {
  const {
    wishList,
    betterHandleWishList,
    handleWishList,
    handleAddToCart,
  } = useCartContext();
  return (
    <>
      <section className="column w12 align-start justify-start padding-32 padding-t-16">
        <ul className="dis-grid product-container wishlist-item margin-t-16 ">
          {wishList.map((product) => (
            <ProductCard
              details={product.details}
              inWishlist={true}
              showAddToCart={false}
              betterHandleWishList={betterHandleWishList}
              handleWishList={handleWishList}
              handleAddToCart={handleAddToCart}></ProductCard>
          ))}
        </ul>
      </section>
    </>
  );
};

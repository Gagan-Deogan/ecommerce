import React from "react";
import "./wishlist.css";
import { ProductCard } from "../../components/ProductCard/ProductCard";
import { useCartContext } from "../../Context";
import { useNavigate } from "react-router-dom";
export const Wishlist = () => {
  const {
    wishlist,
    betterHandleWishList,
    handleWishList,
    handleAddToCart,
  } = useCartContext();
  const navigate = useNavigate();
  const handleProductDetail = (id) => {
    navigate(`/productdetail/${id}`);
  };
  return (
    <>
      <section className="column w12 align-start justify-start padding-32 padding-t-16">
        {!wishlist.length && (
          <div className="column w12 align-center justify-center margin-t-32">
            <h3>Empty Wishlist</h3>
            <p>You have no items in your wishlist. Start adding!</p>
            <button
              className="btn-pry-fil margin-t-16"
              onClick={() => navigate("/store")}>
              Start Adding
            </button>
          </div>
        )}
        <ul className="dis-grid product-container wishlist-item margin-t-16 ">
          {wishlist.map((product) => (
            <ProductCard
              details={product.details}
              inWishlist={true}
              showAddToCart={false}
              betterHandleWishList={betterHandleWishList}
              handleWishList={handleWishList}
              handleAddToCart={handleAddToCart}
              handleProductDetail={handleProductDetail}></ProductCard>
          ))}
        </ul>
      </section>
    </>
  );
};

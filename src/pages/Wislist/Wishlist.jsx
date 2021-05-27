import "./wishlist.css";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useCartAndWishlist } from "Context/CartAndWishlistProvider";
import { ProductCard } from "Components/ProductCard/ProductCard";
export const Wishlist = () => {
  const { wishlist } = useCartAndWishlist();
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
              product={product}
              handleProductDetail={handleProductDetail}></ProductCard>
          ))}
        </ul>
      </section>
    </>
  );
};

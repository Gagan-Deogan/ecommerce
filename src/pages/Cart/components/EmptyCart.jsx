import React from "react";
import { useNavigate } from "react-router-dom";
export const EmptyCart = () => {
  const navigate = useNavigate();
  return (
    <div className="column w12 align-center justify-center padding-64">
      <h4>Your cart is empty!</h4>
      <h6>Add items to it now.</h6>
      <button
        className="btn-pry-fil margin-8"
        onClick={() => navigate("/store")}>
        Shop Now
      </button>
    </div>
  );
};

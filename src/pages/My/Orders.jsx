import { useNavigate } from "react-router";

export const Orders = () => {
  const navigate = useNavigate();
  return (
    <section className="column sm-w12 md-w8 w10 padding-t-32 align-start">
      <h2 className="primary-color bold border-bottom w12 padding-l-16">
        My Orders
      </h2>
      <div className="column w12 align-center justify-center margin-t-32">
        <h3>No Orders!</h3>
        <p>You have no items in your wishlist. Start adding!</p>
        <button
          className="btn-pry-fil margin-t-16"
          onClick={() => navigate("/store")}>
          Start Adding
        </button>
      </div>
    </section>
  );
};

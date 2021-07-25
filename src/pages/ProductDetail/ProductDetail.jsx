import "./productDetail.css";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useCartAndWishlist } from "context/CartAndWishlistProvider";
import { useAuth } from "context/AuthProvider";
import { WishlistButton } from "common-components/WishlistButton";
import { Loader } from "common-components/Loader";
import { Hidden } from "common-components/Hidden";
import { Error } from "common-components/Error";
import { request, isInCart, isInWishlist, debounce } from "utils";
import { StarIcon } from "assests/icons";

const { REACT_APP_IMAGE_URL } = process.env;

const AddToCartButton = ({ inCart, productDetail, onClick }) => {
  const navigate = useNavigate();
  return (
    <button
      className={`sm-btn-pry-fil padding-16 sm-w8 w12 ${
        !productDetail.avalibility && "btn-dis"
      } `}
      onClick={() => (inCart ? navigate("/cart") : onClick())}>
      {inCart && "Go To Cart"}
      {!inCart && productDetail.avalibility && "ADD TO CART"}
      {!productDetail.avalibility && "OUT OF STOCK"}
    </button>
  );
};

export const ProductDetail = () => {
  const { id } = useParams();
  const [status, setStatus] = useState("IDLE");
  const { user } = useAuth();
  const {
    cartDetails: { cartItems },
    wishlist,
    cartAndWishlistDispatch,
  } = useCartAndWishlist();
  const [productDetail, setProductDetail] = useState();

  const inCart = isInCart(cartItems, id);
  const inWishlist = isInWishlist(wishlist, id);

  useEffect(() => {
    if (status === "IDLE") {
      (async () => {
        setStatus("PENDING");
        const res = await request("get", `products/${id}`);
        if ("data" in res) {
          setProductDetail(res.data);
          setStatus("FULFILLED");
        }
      })();
    }
  }, [status, setStatus, id]);

  const handleAddToCart = async () => {
    cartAndWishlistDispatch({
      type: "ADD_TO_CART",
      payload: { product: productDetail },
    });
    if (user) {
      const res = await request("post", `/carts/${id}`);
      if (!("data" in res)) {
        return cartAndWishlistDispatch({
          type: "REMOVE_FROM_CART",
          payload: { product: productDetail },
        });
      }
    }
  };

  const betterHandleAddToCart = debounce(handleAddToCart, 1000);

  return (
    <>
      {(status === "IDLE" || status === "PENDING") && <Loader />}
      {status === "FULFILLED" && (
        <section className="row sm-w12 md-w12 w10 sm-warp padding-32 align-start">
          <div className="sm-w12 w6 product-detail-left">
            <img
              src={REACT_APP_IMAGE_URL + productDetail.image}
              alt=""
              className="bor-rad-8 w12"
            />
          </div>
          <div className="sm-w12 w6 column align-start margin-l-32 product-detail-rigth">
            <div className="row align-center justify-start">
              <h2 className="bold primary-color margin-r-8">
                {productDetail.name}
              </h2>
              <div className="card-ratg">
                <span className="bold margin-r-4">{productDetail.rating}</span>
                <StarIcon />
              </div>
            </div>
            <div className="row margin-b-8 align-center justify-start">
              {productDetail.label && (
                <div className="card-badge">
                  <span>{productDetail.label}</span>
                </div>
              )}
              {productDetail.fastDelivery && (
                <p className="bold margin-l-8">Fast Delivery Available</p>
              )}
            </div>
            <p className="margin-b-16 grey-color">
              {productDetail.description}
            </p>
            <div className="row align-center margin-b-32">
              {productDetail.discount ? (
                <>
                  <h2 className="bold margin-r-4 ">
                    {"Rs. " + productDetail.effectivePrice}
                  </h2>
                  <h5 className="grey-color text-line-thro margin-l-8">
                    {"Rs. " + productDetail.price}
                  </h5>
                  <h5 className="primary-color bold margin-l-8 ">
                    {" "}
                    {productDetail.discount + " %Off"}
                  </h5>
                </>
              ) : (
                <h2 className="bold margin-r-4 ">
                  {"Rs. " + productDetail.effectivePrice}
                </h2>
              )}
            </div>
            <Hidden hideAt="sm-down">
              <div className="row align-center w12">
                <AddToCartButton
                  inCart={inCart}
                  productDetail={productDetail}
                  onClick={betterHandleAddToCart}
                />
                <WishlistButton
                  inWishlist={inWishlist}
                  product={productDetail}
                  className="margin-l-16 padding-16"
                />
              </div>
            </Hidden>
          </div>
          <Hidden hideAt="sm-up">
            <div className="bottom-sheet row justify-between padding-16 padding-l-32 padding-r-32 ">
              <AddToCartButton
                inCart={inCart}
                productDetail={productDetail}
                onClick={betterHandleAddToCart}
              />
              <WishlistButton
                inWishlist={inWishlist}
                product={productDetail}
                className="margin-l-16 padding-16"
              />
            </div>
          </Hidden>
        </section>
      )}
      {status === "ERROR" && <Error setStatus={setStatus} />}
    </>
  );
};

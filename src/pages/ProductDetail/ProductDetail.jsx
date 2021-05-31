import "./productDetail.css";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useCartAndWishlist } from "Context/CartAndWishlistProvider";
import { useStatus } from "Context/LoaderProvider";
import { useSnakbar } from "Context/SnakbarProvider";
import { useAuth } from "Context/AuthProvider";
import { Loader } from "Components/Loader";
import { Hidden } from "Components/Hidden";
import { Button } from "Components/Button";
import { useRequest, isInCart, isInWishlist } from "utils";
import { handleWishList, handleAddToCart } from "services";
import { StarIcon } from "assests/icons";

const { REACT_APP_IMAGE_URL } = process.env;

const CartButton = ({ inCart, productDetail, onClick }) => {
  return (
    <Button
      className={`btn-pry-fil ${
        inCart || !productDetail.avalibility ? "btn-dis" : ""
      } `}
      onClick={onClick}>
      {inCart && "IN CART"}
      {!inCart && productDetail.avalibility && "ADD TO CART"}
      {!productDetail.avalibility && "OUT OF STOCK"}
    </Button>
  );
};

const WishlistButton = ({ inWishlist, productDetail, onClick }) => {
  return (
    <Button className="margin-l-16 btn-pry" onClick={onClick}>
      {inWishlist && "REMOVE FROM WISHLIST"}
      {!inWishlist && "ADD TO WISHLIST"}
    </Button>
  );
};

export const ProductDetail = () => {
  const { id } = useParams();
  const { status, setStatus } = useStatus();
  const { user } = useAuth();
  const {
    cartDetails: { cartItems },
    wishlist,
    cartAndWishlistDispatch,
  } = useCartAndWishlist();
  const { snakbarDispatch } = useSnakbar();
  const [productDetail, setProductDetail] = useState();
  const { request, getCancelToken } = useRequest();

  const inCart = isInCart(cartItems, id);
  const inWishlist = isInWishlist(wishlist, id);
  useEffect(() => {
    const cancelToken = getCancelToken();
    (async () => {
      setStatus("PENDING");
      const { success, data } = await request({
        endpoint: `products/${id}`,
        method: "GET",
      });
      if (success) {
        setProductDetail(data);
        setStatus("IDLE");
      }
    })();
    return () => {
      cancelToken.cancel();
    };
  }, []);

  return (
    <>
      {status !== "IDLE" && <Loader />}
      {status === "IDLE" && productDetail && (
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
              {productDetail.rating && (
                <div className="card-ratg">
                  <span className="bold margin-r-4">
                    {productDetail.rating}
                  </span>
                  <StarIcon />
                </div>
              )}
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
              <div className="row">
                <CartButton
                  inCart={inCart}
                  productDetail={productDetail}
                  onClick={() =>
                    handleAddToCart({
                      product: productDetail,
                      user,
                      cartAndWishlistDispatch,
                      snakbarDispatch,
                      request,
                    })
                  }
                />
                <WishlistButton
                  inWishlist={inWishlist}
                  productDetail={productDetail}
                  onClick={() =>
                    handleWishList({
                      cartAndWishlistDispatch,
                      snakbarDispatch,
                      product: productDetail,
                      user,
                      request,
                      sankbarMsg: inWishlist
                        ? "Product Remove Successfully"
                        : "Product Added Successfully",
                    })
                  }
                />
              </div>
            </Hidden>
          </div>
          <Hidden hideAt="sm-up">
            <div className="bottom-sheet row justify-evenly padding-8">
              <CartButton
                inCart={inCart}
                productDetail={productDetail}
                onClick={() =>
                  handleAddToCart({
                    product: productDetail,
                    user,
                    cartAndWishlistDispatch,
                    snakbarDispatch,
                    request,
                  })
                }
              />
              <WishlistButton
                inWishlist={inWishlist}
                productDetail={productDetail}
                onClick={() =>
                  handleWishList({
                    cartAndWishlistDispatch,
                    snakbarDispatch,
                    product: productDetail,
                    request,
                    sankbarMsg: inWishlist
                      ? "Product Remove Successfully"
                      : "Product Added Successfully",
                  })
                }
              />
            </div>
          </Hidden>
        </section>
      )}
    </>
  );
};

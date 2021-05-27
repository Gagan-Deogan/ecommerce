import "./productDetail.css";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useCartContext } from "Context/CartContext";
import { useStatus } from "Context/LoaderContext";
import { Loader } from "Components/Loader";
import { Hidden } from "Components/Hidden";
import {
  useRequest,
  getProductWithFlags,
  betterHandleWishList,
  handleAddToCart,
} from "utils";
import { StarIcon } from "assests/icons";
import { useSnakbarContext } from "Context/SnakbarContext";
import { useAuthContext } from "Context/AuthContext";
const { REACT_APP_IMAGE_URL } = process.env;

const CartButton = ({ inCartlist, productDetail, onClick }) => {
  return (
    <button
      className={`btn-pry-fil ${
        inCartlist || !productDetail.avalibility ? "btn-dis" : ""
      } `}
      onClick={onClick}>
      {inCartlist && "IN CART"}
      {!inCartlist && productDetail.avalibility && "ADD TO CART"}
      {!productDetail.avalibility && "OUT OF STOCK"}
    </button>
  );
};

const WishlistButton = ({ inWishlist, productDetail, onClick }) => {
  return (
    <button className="margin-l-16 btn-pry" onClick={onClick}>
      {inWishlist && "REMOVE FROM WISHLIST"}
      {!inWishlist && "ADD TO WISHLIST"}
    </button>
  );
};

export const ProductDetail = () => {
  const { id } = useParams();
  const { status, setStatus } = useStatus();
  const { user } = useAuthContext();
  const { cartlist, wishlist, cartDispatch } = useCartContext();
  const { snakbarDispatch } = useSnakbarContext();
  const [productDetail, setProductDetail] = useState();
  const { request, getCancelToken } = useRequest();

  const { inCartlist, inWishlist } = getProductWithFlags({
    cartlist,
    wishlist,
    product: productDetail,
  });
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
                <div class="card-badge">
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
                  inCartlist={inCartlist}
                  productDetail={productDetail}
                  onClick={() => {
                    if (productDetail.avalibility && !inCartlist)
                      handleAddToCart({
                        product: productDetail,
                        user,
                        cartDispatch,
                        snakbarDispatch,
                        request,
                      });
                  }}
                />
                <WishlistButton
                  inWishlist={inWishlist}
                  productDetail={productDetail}
                  onClick={() =>
                    betterHandleWishList({
                      cartDispatch,
                      snakbarDispatch,
                      product: productDetail,
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
                inCartlist={inCartlist}
                productDetail={productDetail}
                onClick={() => {
                  if (productDetail.avalibility && !inCartlist)
                    handleAddToCart({
                      product: productDetail,
                      user,
                      cartDispatch,
                      snakbarDispatch,
                      request,
                    });
                }}
              />
              <WishlistButton
                inWishlist={inWishlist}
                productDetail={productDetail}
                onClick={() =>
                  betterHandleWishList({
                    cartDispatch,
                    snakbarDispatch,
                    product: productDetail,
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

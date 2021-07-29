import "./productDetail.css";
import { useNavigate, useParams } from "react-router-dom";
import { useCartAndWishlist } from "context/CartAndWishlistProvider";
import { useAuth } from "context/AuthProvider";
import { useSnakbar } from "context/SnakbarProvider";
import { WishlistButton } from "common-components/WishlistButton";
import { Hidden } from "common-components/Hidden";
import { request, isInCart, isInWishlist, debounce } from "utils";
import { StarIcon } from "assests/icons";
import { useProduct } from "./useProductDetails";
import { GenricSection } from "common-components/GenricSection";

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
  const { user } = useAuth();
  const {
    cartDetails: { cartItems },
    wishlist,
    cartAndWishlistDispatch,
  } = useCartAndWishlist();
  const { snakbarDispatch } = useSnakbar();

  const { isSuccess, isLoading, data } = useProduct(id);
  const inCart = isInCart(cartItems, id);
  const inWishlist = isInWishlist(wishlist, id);

  const handleAddToCart = async () => {
    cartAndWishlistDispatch({
      type: "ADD_TO_CART",
      payload: { product: data },
    });
    snakbarDispatch({ type: "SUCCESS", payload: "Product Added" });
    if (user) {
      const res = await request("post", `/carts/${id}`);
      if (!("data" in res)) {
        return cartAndWishlistDispatch({
          type: "REMOVE_FROM_CART",
          payload: { product: data },
        });
      }
    }
  };

  const betterHandleAddToCart = debounce(handleAddToCart, 1000);
  return (
    <>
      <GenricSection
        className="row sm-w12 md-w12 w10 sm-warp padding-32 align-start"
        isLoading={isLoading}
        isSuccess={isSuccess}>
        {data && (
          <>
            <div className="sm-w12 w6 product-detail-left">
              <img
                src={REACT_APP_IMAGE_URL + data.image}
                alt=""
                className="bor-rad-8 w12"
              />
            </div>
            <div className="sm-w12 w6 column align-start margin-l-32 product-detail-rigth">
              <div className="row align-center justify-start">
                <h2 className="bold primary-color margin-r-8">{data.name}</h2>
                <div className="card-ratg">
                  <span className="bold margin-r-4">{data.rating}</span>
                  <StarIcon />
                </div>
              </div>
              <div className="row margin-b-8 align-center justify-start">
                {data.label && (
                  <div className="card-badge">
                    <span>{data.label}</span>
                  </div>
                )}
                {data.fastDelivery && (
                  <p className="bold margin-l-8">Fast Delivery Available</p>
                )}
              </div>
              <p className="margin-b-16 grey-color">{data.description}</p>
              <div className="row align-center margin-b-32">
                {data.discount ? (
                  <>
                    <h2 className="bold margin-r-4 ">
                      {"Rs. " + data.effectivePrice}
                    </h2>
                    <h5 className="grey-color text-line-thro margin-l-8">
                      {"Rs. " + data.price}
                    </h5>
                    <h5 className="primary-color bold margin-l-8 ">
                      {" "}
                      {data.discount + " %Off"}
                    </h5>
                  </>
                ) : (
                  <h2 className="bold margin-r-4 ">
                    {"Rs. " + data.effectivePrice}
                  </h2>
                )}
              </div>
              <Hidden hideAt="sm-down">
                <div className="row align-center w12">
                  <AddToCartButton
                    inCart={inCart}
                    productDetail={data}
                    onClick={betterHandleAddToCart}
                  />
                  <WishlistButton
                    inWishlist={inWishlist}
                    product={data}
                    className="margin-l-16 padding-16"
                  />
                </div>
              </Hidden>
            </div>
            <Hidden hideAt="sm-up">
              <div className="bottom-sheet row justify-between padding-16 padding-l-32 padding-r-32 ">
                <AddToCartButton
                  inCart={inCart}
                  productDetail={data}
                  onClick={betterHandleAddToCart}
                />
                <WishlistButton
                  inWishlist={inWishlist}
                  product={data}
                  className="margin-l-16 padding-16"
                />
              </div>
            </Hidden>
          </>
        )}
      </GenricSection>
    </>
  );
};

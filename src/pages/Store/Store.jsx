import { useState, useEffect, useReducer } from "react";
import { useNavigate } from "react-router-dom";
import { useCartContext } from "../../Context";
import { useStatus } from "../../Context";
import { ProductCard } from "../../components/ProductCard";
import { Hidden } from "../../components/Hidden";
import { Model } from "../../components/Model";
import { useQuery } from "../../Utils";
import { FiltersMenu } from "./FiltersMenu.jsx";
import { reducer } from "./filters";
import {
  getSortedData,
  getProductByRating,
  getFilterbyAvalibility,
} from "./filters";
import "./store.css";
import { FiltersIcons } from "../../assests";
import { Loader } from "../../components/Loader";
import { useRequest } from "../../Utils/request";

export const Store = () => {
  const { queryParser, queryEncoder } = useQuery();
  const [products, setProducts] = useState([]);
  const {
    cartList,
    wishList,
    betterHandleWishList,
    handleAddToCart,
    handleWishList,
  } = useCartContext();
  const { status, setStatus } = useStatus();
  const [isOpenModel, setIsOpenModel] = useState(false);
  const { request, getCancelToken } = useRequest();
  const navigate = useNavigate();

  // url decoding
  const initial = {
    sortBy: queryParser("sortBy") || "",
    showRating: queryParser("showRating"),
    showInvertory: queryParser("showInvertory") || true,
  };
  const categoryId = queryParser("category");

  const [{ sortBy, showRating, showInvertory }, dispatch] = useReducer(
    reducer,
    initial
  );

  // sorts the data
  const sortedData = getSortedData(products, sortBy);
  const filterByRating = getProductByRating(sortedData, showRating);
  const filterData = getFilterbyAvalibility(filterByRating, showInvertory);

  // For calling end points....
  useEffect(() => {
    const cancelToken = getCancelToken();
    (async () => {
      setStatus("PENDING");
      try {
        const { products, success } = await request({
          method: "GET",
          endpoint: categoryId ? `categories/${categoryId}` : "/products",
          cancelToken: cancelToken.token,
        });
        setStatus("IDLE");
        if (success) {
          setProducts(products);
        }
      } catch (err) {
        setStatus("IDLE");
      }
    })();
    return () => {
      cancelToken.cancel();
    };
  }, []);
  const handleProductDetail = (id) => {
    navigate(`/productdetail/${id}`);
  };
  useEffect(() => {
    if (products) {
      const categoryQuery = categoryId
        ? `category=${queryEncoder(categoryId)}&`
        : "";
      const sortQuery =
        sortBy === "LH" || sortBy === "HL"
          ? `sortBy=${queryEncoder(sortBy)}`
          : "";
      const ratingQuery = showRating
        ? `&showRating=${queryEncoder(showRating)}`
        : "";
      const inventoryQuery = `&showInvertory=${queryEncoder(showInvertory)}`;
      navigate(
        `/store?${categoryQuery + sortQuery + ratingQuery + inventoryQuery}`
      );
    }
  }, [sortBy, showRating, showInvertory]);
  console.log(products);
  return (
    <>
      {status !== "IDLE" && <Loader />}
      {status === "IDLE" && (
        <>
          <section className="route-container row sm-column align-start justify-center w12 padding-16 padding-t-32">
            <Hidden hideAt="sm-up">
              <button
                className="sm-btn-pry bold primary-color margin-b-32"
                onClick={() => setIsOpenModel(true)}>
                <h3 className="margin-r-8">Filters</h3>
                <FiltersIcons />
              </button>
            </Hidden>
            <Hidden hideAt="sm-down">
              <div className="column filter-container bor-rad-8 margin-r-16 bor-sol">
                <FiltersMenu
                  sortBy={sortBy}
                  showRating={showRating}
                  showInvertory={showInvertory}
                  dispatch={dispatch}
                />
              </div>
            </Hidden>
            <Hidden hideAt="sm-up">
              <Model isOpenModel={isOpenModel} setIsOpenModel={setIsOpenModel}>
                <div className="bottom-sheet">
                  <FiltersMenu
                    sortBy={sortBy}
                    showRating={showRating}
                    showInvertory={showInvertory}
                    dispatch={dispatch}
                  />
                </div>
              </Model>
            </Hidden>
            <div className="dis-grid product-container">
              {!!filterData.length &&
                filterData.map((product) => (
                  <ProductCard
                    details={product}
                    key={product._id}
                    handleAddToCart={handleAddToCart}
                    betterHandleWishList={betterHandleWishList}
                    handleWishList={handleWishList}
                    handleProductDetail={handleProductDetail}
                  />
                ))}
            </div>
          </section>
        </>
      )}
    </>
  );
};

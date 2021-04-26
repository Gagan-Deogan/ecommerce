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
  getFilterByOffer,
  getFilterbyLabel,
} from "./filters";
import "./store.css";
import { FiltersIcons } from "../../assests/icons";
import { Loader } from "../../components/Loader";
import { useRequest } from "../../Utils/request";

export const Store = () => {
  const { queryParser, queryEncoder } = useQuery();
  const [products, setProducts] = useState([]);
  const {
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
    showOffer: queryParser("showOffer") || false,
    showNew: queryParser("showNew") || false,
    showBestSeller: queryParser("showBestSeller") || false,
  };
  const categoryId = queryParser("category");

  const [
    { sortBy, showRating, showInvertory, showOffer, showNew, showBestSeller },
    dispatch,
  ] = useReducer(reducer, initial);

  // sorts the data
  const sortedData = getSortedData(products, sortBy);
  const filterByRating = getProductByRating(sortedData, showRating);
  const filterByInventory = getFilterbyAvalibility(
    filterByRating,
    showInvertory
  );
  const filterbyOffer = getFilterByOffer(filterByInventory, showOffer);
  const filterData = getFilterbyLabel(filterbyOffer, showBestSeller, showNew);
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
      const discountQuery = `&showOffer=${showOffer}`;
      const newQuery = `&showNew=${showNew}`;
      const BestSellerQuery = `&showBestSeller=${showBestSeller}`;
      navigate(
        `/store?${
          categoryQuery +
          sortQuery +
          ratingQuery +
          inventoryQuery +
          discountQuery +
          newQuery +
          BestSellerQuery
        }`
      );
    }
  }, [sortBy, showRating, showInvertory, showOffer, showNew, showBestSeller]);
  return (
    <>
      {status !== "IDLE" && <Loader />}
      {status === "IDLE" && (
        <>
          <section className="route-container row sm-column align-start justify-center w12 padding-16 padding-t-32">
            <Hidden hideAt="sm-up">
              <div className="bottom-sheet row justify-end">
                <button
                  className="sm-btn-pry-fil bold margin-t-16 margin-r-16 padding-b-16"
                  onClick={() => setIsOpenModel(true)}>
                  <FiltersIcons />
                  <h3 className="margin-l-8">Filters</h3>
                </button>
              </div>
            </Hidden>
            <Hidden hideAt="sm-down">
              <div className="column filter-container bor-rad-8 margin-r-16 bor-sol">
                <FiltersMenu
                  sortBy={sortBy}
                  showRating={showRating}
                  showInvertory={showInvertory}
                  showOffer={showOffer}
                  showNew={showNew}
                  showBestSeller={showBestSeller}
                  dispatch={dispatch}
                />
              </div>
            </Hidden>
            <Hidden hideAt="sm-up">
              <Model isOpenModel={isOpenModel} setIsOpenModel={setIsOpenModel}>
                <div className="bottom-sheet padding-b-16">
                  <FiltersMenu
                    sortBy={sortBy}
                    showRating={showRating}
                    showInvertory={showInvertory}
                    showOffer={showOffer}
                    showNew={showNew}
                    showBestSeller={showBestSeller}
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

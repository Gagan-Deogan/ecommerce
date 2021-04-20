import { useState, useEffect, useReducer } from "react";
import { useCartContext } from "../../Context";
import { useStatus } from "../../Context";
import { useSnakbarContext } from "../../Context";
import { ProductCard } from "../../components/ProductCard";
import { Hidden } from "../../components/Hidden";
import { Model } from "../../components/Model";
import { useQuery } from "../../Utils";
import { useDebouncing } from "../../Utils";
import { FiltersMenu } from "./FiltersMenu.jsx";
import { initialFilters, reducer, getProductWithFlags } from "./filters";
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
  const [products, setProducts] = useState([]);
  const {
    cartList,
    wishList,
    betterHandleWishList,
    handleAddToCart,
  } = useCartContext();
  const { status, setStatus } = useStatus();
  const [isOpenModel, setIsOpenModel] = useState(false);
  const { snakbarDispatch } = useSnakbarContext();
  const { request, getCancelToken } = useRequest();

  // for decoding seacrh query
  const { queryParser } = useQuery();
  initialFilters.category = queryParser("category") || initialFilters.category;
  initialFilters.sortBy = queryParser("sort") || initialFilters.sortBy;
  initialFilters.shownRating =
    queryParser("showrating") || initialFilters.showRating;
  initialFilters.showInvertory =
    queryParser("showInvertory") || initialFilters.showInvertory;

  const [
    { category, sortBy, showRating, showInvertory },
    dispatch,
  ] = useReducer(reducer, initialFilters);

  const productWithFlags = getProductWithFlags(cartList, wishList, products);

  // sorts the data
  const sortedData = getSortedData(productWithFlags, sortBy);

  const filterByRating = getProductByRating(sortedData, showRating);
  const filterData = getFilterbyAvalibility(filterByRating, showInvertory);

  // For calling end points....
  useEffect(() => {
    const cancelToken = getCancelToken();
    (async () => {
      setStatus("PENDING");
      try {
        const { data } = await request({
          method: "GET",
          endpoint: category ? `categories/${category}` : "/products",
          cancelToken: cancelToken.token,
        });
        setStatus("IDLE");
        if (data.products) {
          setProducts(data["products"]);
        } else {
          console.log("some thing went worng.");
        }
      } catch (err) {
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
              {filterData &&
                filterData.map((product) => (
                  <ProductCard
                    product={product}
                    key={product.id}
                    handleAddToCart={handleAddToCart}
                    betterHandleWishList={betterHandleWishList}
                  />
                ))}
            </div>
          </section>
        </>
      )}
    </>
  );
};

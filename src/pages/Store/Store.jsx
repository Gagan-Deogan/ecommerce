import "./store.css";
import { useState, useEffect, useReducer } from "react";
import { useNavigate } from "react-router-dom";
import { useStatus } from "context/LoaderProvider";
import { ProductCard } from "components/ProductCard";
import { Hidden } from "components/Hidden";
import { Model } from "components/Model";
import { Loader } from "components/Loader";
import { FiltersMenu } from "components/FiltersMenu";
import { reducer } from "./reducer";
import {
  getSortedData,
  getProductByRating,
  getFilterbyAvalibility,
  getFilterByOffer,
  getFilterbyLabel,
  applyFilterToUrl,
  useQuery,
  useRequest,
} from "utils";
import { FiltersIcons } from "assests/icons";

export const Store = () => {
  const navigate = useNavigate();
  const { queryParser, queryEncoder } = useQuery();
  const { request, getCancelToken } = useRequest();

  const [products, setProducts] = useState([]);
  const { status, setStatus } = useStatus();
  const [isOpenModel, setIsOpenModel] = useState(false);
  // close Model
  const handleCloseModel = () => {
    setIsOpenModel(false);
  };
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
  const handleProductDetail = (id) => {
    navigate(`/productdetail/${id}`);
  };

  // For calling end points....
  useEffect(() => {
    const cancelToken = getCancelToken();
    (async () => {
      setStatus("PENDING");
      const res = await request({
        method: "GET",
        endpoint: categoryId ? `categories/${categoryId}` : "/products",
        cancelToken: cancelToken.token,
      });
      if (res && res.success) {
        setStatus("IDLE");
        setProducts(res.data);
      }
    })();
    return () => {
      cancelToken.cancel();
    };
  }, [categoryId]);

  useEffect(() => {
    if (products) {
      applyFilterToUrl(
        categoryId,
        queryEncoder,
        sortBy,
        showRating,
        showInvertory,
        showOffer,
        showNew,
        showBestSeller,
        navigate
      );
    }
  }, [
    categoryId,
    sortBy,
    showRating,
    showInvertory,
    showOffer,
    showNew,
    showBestSeller,
    products,
  ]);

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
              <Model isOpen={isOpenModel} closeModel={handleCloseModel}>
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
                    product={product}
                    key={product._id}
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

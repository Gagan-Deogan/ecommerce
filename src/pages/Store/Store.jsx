import "./store.css";
import { useState, useEffect, useReducer } from "react";
import { useNavigate } from "react-router-dom";
import { ProductCard } from "common-components/ProductCard";
import { Hidden } from "common-components/Hidden";
import { Modal } from "common-components/Modal";
import { Loader } from "common-components/Loader";
import { Error } from "common-components/Error";
import { FiltersMenu } from "common-components/FiltersMenu";
import { reducer } from "./reducer";
import {
  getSortedData,
  getProductByRating,
  getFilterbyAvalibility,
  getFilterByOffer,
  getFilterbyLabel,
  applyFilterToUrl,
  useQuery,
  request,
} from "utils";
import { FiltersIcons } from "assests/icons";

export const Store = () => {
  const navigate = useNavigate();
  const { queryParser, queryEncoder } = useQuery();

  const [products, setProducts] = useState([]);
  const [status, setStatus] = useState("IDLE");
  const [isOpenModal, setIsOpenModal] = useState(false);
  // close Modal
  const handleCloseModal = () => {
    setIsOpenModal(false);
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
    if (status === "IDLE") {
      (async () => {
        setStatus("PENDING");
        const endpoint = categoryId ? `categories/${categoryId}` : "/products";
        const res = await request("get", endpoint);
        if ("data" in res) {
          setProducts(res.data);
          setStatus("FULFILLED");
        }
      })();
    }
  }, [categoryId, setStatus, status]);

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
      {(status === "IDLE" || status === "PENDING") && <Loader />}
      {status === "FULFILLED" && (
        <>
          <section className="route-container row sm-column align-start justify-center w12 padding-16 padding-t-32">
            <Hidden hideAt="sm-up">
              <div className="bottom-sheet row justify-end">
                <button
                  className="sm-btn-pry-fil bold margin-t-16 margin-r-16 padding-b-16"
                  onClick={() => setIsOpenModal(true)}>
                  <FiltersIcons />
                  <h3 className="margin-l-8">Filters</h3>
                </button>
              </div>
              <Modal isOpen={isOpenModal} closeModal={handleCloseModal}>
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
              </Modal>
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
      {status === "ERROR" && <Error setStatus={setStatus} />}
    </>
  );
};

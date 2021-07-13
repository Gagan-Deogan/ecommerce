import "./store.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ProductCard } from "common-components/ProductCard";
import { Hidden } from "common-components/Hidden";
import { Modal } from "common-components/Modal";
import { Loader } from "common-components/Loader";
import { Error } from "common-components/Error";
import { FiltersMenu } from "./FiltersMenu";
import { request } from "utils";
import { FiltersIcons } from "assests/icons";
import { useFilters } from "./filter.hooks";
import axios from "axios";
export const Store = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const {
    categoryId,
    sortBy,
    showRating,
    showInvertory,
    showOffer,
    showNew,
    showBestSeller,
    filterDispatch,
    filteredData,
  } = useFilters({ products });
  const [status, setStatus] = useState("IDLE");
  const [isOpenModal, setIsOpenModal] = useState(false);
  // close Modal

  const handleCloseModal = () => {
    setIsOpenModal(false);
  };

  const handleProductDetail = (id) => {
    navigate(`/productdetail/${id}`);
  };

  // For calling end points....
  useEffect(() => {
    const source = axios.CancelToken.source();
    if (status === "IDLE") {
      (async () => {
        setStatus("PENDING");
        const endpoint = categoryId ? `categories/${categoryId}` : "/products";
        const res = await request("get", endpoint, undefined, {
          cancelToken: source.token,
        });
        if ("data" in res) {
          setProducts(res.data);
          setStatus("FULFILLED");
        }
      })();
    }
    return () => {
      source.cancel();
    };
  }, [categoryId, setStatus, status]);

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
                    filterDispatch={filterDispatch}
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
                  filterDispatch={filterDispatch}
                />
              </div>
            </Hidden>
            <div className="dis-grid product-container">
              {!!filteredData.length &&
                filteredData.map((product) => (
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

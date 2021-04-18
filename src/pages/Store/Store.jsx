import React, { useState, useEffect } from "react";
import axios from "axios";
import { ProductCard } from "../../components/ProductCard";
import { useCartContext } from "../../Context";
import { useStatus } from "../../Context";
import { useSnakbarContext } from "../../Context";
import { useDebouncing } from "../../Utils/Debouncing";
import { FiltersMenu } from "./FiltersMenu.jsx";
import { useQuery } from "../../Utils/Query";
import { Hidden } from "../../components/Hidden";
import {
  getSortedData,
  getFilterByCategories,
  getProductByRating,
  getFilterbyAvalibility,
} from "./filters";
import "./store.css";
import { FiltersIcons } from "../../assests";
import { Loader } from "../../components/Loader";
import { useRequest } from "../../Utils/request";

const Model = ({ children, openModel, setCloseMOdel }) => {
  const handleClose = (e) => {
    if (e.target.id === "model-container") {
      setCloseMOdel(!openModel);
    }
  };
  return (
    <>
      {openModel && (
        <div
          id="model-container"
          className="model-container pos-f justify-center align-center"
          onClick={handleClose}>
          {children}
        </div>
      )}
    </>
  );
};

export const Store = () => {
  const [products, setProducts] = useState([]);
  const { cartList, wishList, cartDispatch } = useCartContext();
  const { status, setStatus } = useStatus();
  const [openModel, setCloseMOdel] = useState(false);
  const { snakbarDispatch } = useSnakbarContext();
  const { request, getCancelToken } = useRequest();
  // for decoding seacrh query
  const { queryParser } = useQuery();
  const sortBy = queryParser("sort");
  const showCatagoeries = queryParser("catagories") || [];
  const shownRating = queryParser("shownrating");
  const showInvertory =
    queryParser("showInvertory") !== null ? queryParser("showInvertory") : true;

  const productWithFlags = (() => {
    const productsIdInCart = cartList.map((item) => item.id);
    const productsIdInWishList = wishList.map((item) => item.id);
    return products.map((product) => {
      const productWithInCartFlag = productsIdInCart.includes(product.id)
        ? { ...product, inCart: true }
        : product;
      return productsIdInWishList.includes(productWithInCartFlag.id)
        ? { ...productWithInCartFlag, inWish: true }
        : productWithInCartFlag;
    });
  })();

  // this will find add the possible category in list
  const categoryReducer = (acc, value) =>
    !acc.includes(value) ? acc.concat([value]) : acc;
  const categoryInList = products
    .map((product) => product["category"])
    .reduce(categoryReducer, []);

  // sorts the data
  const sortedData = getSortedData(productWithFlags, sortBy);

  // shows the selected cate
  const selectedCategoriesData = getFilterByCategories(
    sortedData,
    showCatagoeries
  );

  const filterByRating = getProductByRating(
    selectedCategoriesData,
    shownRating
  );
  const filterData = getFilterbyAvalibility(filterByRating, showInvertory);

  const handleAddToCart = (product) => {
    cartDispatch({ type: "ADD_TO_CART", payload: product });
    snakbarDispatch({ type: "SUCCESS", payload: "Added To Cart" });
  };

  const handleWishList = (product) => {
    const wishType = product.inWish
      ? "REMOVE_FROM_WISHLIST"
      : "ADD_TO_WISHLIST";
    const wishPayload = product.inWish ? product.id : product;
    const sankbarMsg = product.inWish
      ? "Succesfull Removed from Wishlist"
      : "Succesfull Added to Wishlist";
    cartDispatch({ type: wishType, payload: wishPayload });
    snakbarDispatch({ type: "DEFAULT", payload: sankbarMsg });
  };
  const betterHandleWishList = useDebouncing(handleWishList, 500);

  // For calling end points....
  useEffect(() => {
    const cancelToken = getCancelToken();
    (async () => {
      setStatus("PENDING");
      try {
        const { data } = await request({
          method: "GET",
          endpoint: "/products",
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
      {!filterData.length ? (
        <>
          <Loader></Loader>
        </>
      ) : (
        <>
          <section className="route-container row sm-column align-start justify-center w12 padding-16 padding-t-32">
            <Hidden hideAt="sm-up">
              <button
                className="sm-btn-pry bold primary-color margin-b-32"
                onClick={() => setCloseMOdel(true)}>
                <h3 className="margin-r-8">Filters</h3>
                <FiltersIcons />
              </button>
            </Hidden>
            <Hidden hideAt="sm-down">
              <div className="column filter-container bor-rad-8 margin-r-16 bor-sol">
                <FiltersMenu
                  categoryInList={categoryInList}
                  sortBy={sortBy}
                  showCatagoeries={showCatagoeries}
                  shownRating={shownRating}
                  showInvertory={showInvertory}
                />
              </div>
            </Hidden>
            <Hidden hideAt="sm-up">
              <Model openModel={openModel} setCloseMOdel={setCloseMOdel}>
                <div className="bottom-sheet">
                  <FiltersMenu
                    categoryInList={categoryInList}
                    sortBy={sortBy}
                    showCatagoeries={showCatagoeries}
                    shownRating={shownRating}
                    showInvertory={showInvertory}
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

import "./store.css";
import { useNavigate } from "react-router-dom";
import { GenricSection } from "common-components/GenricSection";
import { FilterMenu } from "./components/FilterMenu";
import { useFilters, useRequest, useURL } from "hooks";
import { ProductsList } from "./components/ProductsList";

export const Store = () => {
  const navigate = useNavigate();
  const { urlParser } = useURL();

  const categoryId = urlParser("category");

  const endpoint = categoryId ? `categories/${categoryId}` : "/products";
  const { isLoading, isSuccess, data } = useRequest(endpoint);

  const { filters, filterDispatch, filteredData } = useFilters(
    data ? data : []
  );

  const handleProductDetail = (id) => {
    navigate(`/productdetail/${id}`);
  };

  return (
    <>
      <GenricSection
        isLoading={isLoading}
        isSuccess={isSuccess}
        className="route-container row sm-column sm-justify-center md-justify-center justify-start align-start w12 padding-16 padding-t-32">
        <FilterMenu filters={filters} filterDispatch={filterDispatch} />
        <ProductsList
          product={filteredData}
          handleProductDetail={handleProductDetail}
        />
      </GenricSection>
    </>
  );
};

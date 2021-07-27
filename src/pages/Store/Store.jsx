import "./store.css";
import { useNavigate } from "react-router-dom";
import { ProductCard } from "common-components/ProductCard";
import { GenricSection } from "common-components/GenricSection";
import { FilterMenu } from "./components/FilterMenu";
import { useFilters, useRequest, useURL } from "hooks";
export const Store = () => {
  const navigate = useNavigate();
  const { urlParser } = useURL();

  const categoryId = urlParser("category");

  const endpoint = categoryId ? `categories/${categoryId}` : "/products";
  const { data, isLoading, isError, retry } = useRequest(endpoint);

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
        isError={isError}
        retry={retry}
        className="route-container row sm-column align-start justify-center w12 padding-16 padding-t-32">
        <FilterMenu filters={filters} filterDispatch={filterDispatch} />
        <div className="dis-grid w12 product-container">
          {!!filteredData.length &&
            filteredData.map((product) => (
              <ProductCard
                product={product}
                key={product._id}
                handleProductDetail={handleProductDetail}
              />
            ))}
        </div>
      </GenricSection>
    </>
  );
};

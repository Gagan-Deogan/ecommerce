import "./store.css";
import { useNavigate } from "react-router-dom";
import { ProductCard } from "common-components/ProductCard";
import { GenricSection } from "common-components/GenricSection";
import { FilterMenu } from "./components/FilterMenu";
import { useFilters, useRequest, useURL } from "hooks";
import { motion } from "framer-motion";
const container = {
  hidden: { opacity: 0.2, y: 20 },
  visible: {
    y: 0,
    opacity: 1,
  },
};
const ProductsList = ({ product, handleProductDetail }) => {
  return (
    <motion.div variants={container} initial="hidden" animate="visible">
      <div className="dis-grid w12 product-container">
        {!!product.length &&
          product.map((product) => (
            <ProductCard
              product={product}
              key={product._id}
              handleProductDetail={handleProductDetail}
            />
          ))}
      </div>
    </motion.div>
  );
};

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
        className="route-container row sm-column justify-center align-start w12 padding-16 padding-t-32">
        <FilterMenu filters={filters} filterDispatch={filterDispatch} />
        <ProductsList
          product={filteredData}
          handleProductDetail={handleProductDetail}
        />
      </GenricSection>
    </>
  );
};

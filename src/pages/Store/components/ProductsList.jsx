import { ProductCard } from "common-components/ProductCard";

import { motion } from "framer-motion";
const container = {
  hidden: { opacity: 0.2, y: 20 },
  visible: {
    y: 0,
    opacity: 1,
  },
};

export const ProductsList = ({ product, handleProductDetail }) => {
  return (
    <div className="sm-w12 w12">
      <motion.div variants={container} initial="hidden" animate="visible">
        <div className="dis-grid sm-w12 product-container">
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
    </div>
  );
};

import { Link } from "react-router-dom";
import { homeSectionsData } from "constants/index";
import { ProductCard } from "common-components/ProductCard";
import { motion } from "framer-motion";

const container = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    y: 0,
    opacity: 1,
  },
};

export const HomeSection = ({ name, products, handleProductDetail }) => {
  return (
    <motion.div variants={container} initial="hidden" animate="visible">
      <section className="catagories-container w12 padding-16">
        <div className="row justify-between align-center">
          <h2 className="bold">{homeSectionsData[name].title}</h2>
          <Link
            className="bold text-end btn-link"
            to={homeSectionsData[name].link}>
            SEE MORE
          </Link>
        </div>
        <p>{homeSectionsData[name].subtitle}</p>
        <div className="dis-grid catagories-container--card margin-t-16">
          {products.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
              handleProductDetail={handleProductDetail}></ProductCard>
          ))}
        </div>
      </section>
    </motion.div>
  );
};

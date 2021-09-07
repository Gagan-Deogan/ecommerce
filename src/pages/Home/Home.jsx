import "./home.css";
import { useNavigate } from "react-router-dom";
import { HomeSection } from "./components/HomeSection";
import { useRequest } from "hooks";
import { HomeBanner } from "./components/HomeBanner";
import { GenricSection } from "common-components/GenricSection";
export const Home = () => {
  const navigate = useNavigate();
  const { isLoading, isSuccess, data } = useRequest("home");
  const handleProductDetail = (id) => {
    navigate(`/productdetail/${id}`);
  };
  return (
    <>
      <GenricSection
        isLoading={isLoading}
        isSuccess={isSuccess}
        className="column align-center route-cont home-container">
        <HomeBanner />
        {data &&
          Object.entries(data).map(([key, products]) => (
            <HomeSection
              key={key}
              name={key}
              products={products}
              handleProductDetail={handleProductDetail}
            />
          ))}
      </GenricSection>
    </>
  );
};

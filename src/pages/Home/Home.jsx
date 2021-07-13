import { useEffect, useState } from "react";
import wapperbackground from "assests/images/wall.png";
import "./home.css";
import { request } from "utils";
import { useNavigate } from "react-router-dom";
import { Loader } from "common-components/Loader";
import { Error } from "common-components/Error";
import axios from "axios";
import { HomeSection } from "./HomeSection";

const HomeBanner = () => {
  return (
    <header className="w12">
      <picture>
        <img
          className="responsive-img "
          src={wapperbackground}
          alt="wall background "
        />
      </picture>
    </header>
  );
};

export const Home = () => {
  const navigate = useNavigate();
  const [homeProducts, setHomeProducts] = useState();
  const [status, setStatus] = useState("IDLE");

  const handleProductDetail = (id) => {
    navigate(`/productdetail/${id}`);
  };

  useEffect(() => {
    const source = axios.CancelToken.source();
    if (status === "IDLE") {
      (async () => {
        setStatus("PENDING");
        const res = await request("get", "/home", undefined, {
          cancelToken: source.token,
        });
        if ("data" in res) {
          setHomeProducts(res.data);
          setStatus("FULFILLED");
        } else {
          setStatus("ERROR");
        }
      })();
    }
    return () => {
      source.cancel();
    };
  }, [setStatus, status]);

  return (
    <>
      <div className="column align-center route-cont home-container">
        {(status === "IDLE" || status === "PENDING") && <Loader />}
        {status === "FULFILLED" && (
          <>
            <HomeBanner />
            {Object.entries(homeProducts).map(([key, products]) => (
              <HomeSection
                key={key}
                name={key}
                products={products}
                handleProductDetail={handleProductDetail}
              />
            ))}
          </>
        )}
        {status === "ERROR" && <Error setStatus={setStatus} />}
      </div>
    </>
  );
};

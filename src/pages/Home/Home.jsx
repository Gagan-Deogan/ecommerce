import { useEffect, useState } from "react";
import wapperbackground from "assests/images/wall.png";
import "./home.css";
import { ProductCard } from "common-components/ProductCard";
import { request } from "utils";
import { Link, useNavigate } from "react-router-dom";
import { Loader } from "common-components/Loader";
import { Error } from "common-components/Error";
export const Home = () => {
  const navigate = useNavigate();
  const [homeProducts, setHomeProducts] = useState();
  const [status, setStatus] = useState("IDLE");

  const handleProductDetail = (id) => {
    navigate(`/productdetail/${id}`);
  };

  useEffect(() => {
    if (status === "IDLE") {
      (async () => {
        setStatus("PENDING");
        const res = await request("get", "/home");
        if ("data" in res) {
          setStatus("FULFILLED");
          setHomeProducts(res.data);
        } else {
          setStatus("ERROR");
        }
      })();
    }
  }, [setStatus, status]);
  return (
    <>
      <div className="column align-center route-cont home-container">
        {(status === "IDLE" || status === "PENDING") && <Loader />}
        {status === "FULFILLED" && homeProducts && (
          <>
            <header className="w12">
              <picture>
                <img
                  className="responsive-img "
                  src={wapperbackground}
                  alt="wall background "
                />
              </picture>
            </header>
            <section className="catagories-container w12 padding-16">
              <div className="row justify-between align-center">
                <h2 className="bold">Deal of the Day</h2>
                <Link
                  className="bold text-end btn-link"
                  to={`/store?&showInvertory=true&showOffer=true&showNew=false&showBestSeller=false`}>
                  SEE MORE
                </Link>
              </div>
              <p>
                All of this is available at a quite reasonable price so that
                everyone can have their own glorious and lush plants set-up at
                their loving abode.
              </p>
              <div className="dis-grid catagories-container--card margin-t-16">
                {homeProducts?.bestDeals.map((product) => (
                  <ProductCard
                    product={product}
                    key={product._id}
                    handleProductDetail={handleProductDetail}></ProductCard>
                ))}
              </div>
            </section>
            <section className="catagories-container w12 padding-16 ">
              <div className="row justify-between align-center">
                <h2 className="bold">Plants</h2>
                <Link
                  className="bold text-end btn-link"
                  to={`/store?category="607d20d2ebcbc4055460af6f"&showInvertory=true&showOffer=false&showNew=false&showBestSeller=false`}>
                  SEE MORE
                </Link>
              </div>
              <p>
                All of this is available at a quite reasonable price so that
                everyone can have their own glorious and lush plants set-up at
                their loving abode.
              </p>
              <div className="dis-grid catagories-container--card margin-t-16">
                {homeProducts?.plants.map((product) => (
                  <ProductCard
                    product={product}
                    key={product._id}
                    handleProductDetail={handleProductDetail}></ProductCard>
                ))}
              </div>
            </section>
            <section className="catagories-container w12 padding-16 ">
              <div className="row justify-between align-center">
                <h2 className="bold">Tools</h2>
                <Link
                  className="bold text-end btn-link"
                  to={`/store?category="607d5210ebcbc4055460af75"&showInvertory=true&showOffer=false&showNew=false&showBestSeller=false`}>
                  SEE MORE
                </Link>
              </div>
              <p className="w12">
                All of this is available at a quite reasonable price so that
                everyone can have their own glorious and lush plants set-up at
                their loving abode.
              </p>
              <div className="dis-grid catagories-container--card margin-t-16">
                {homeProducts?.tools.map((product) => (
                  <ProductCard
                    product={product}
                    key={product._id}
                    handleProductDetail={handleProductDetail}></ProductCard>
                ))}
              </div>
            </section>
            <section className="catagories-container w12 padding-16 ">
              <div className="row justify-between align-center">
                <h2 className="bold">Best Sellers</h2>
                <Link
                  className="bold text-end btn-link"
                  to={
                    "/store?showInvertory=true&showOffer=false&showNew=false&showBestSeller=true"
                  }
                  href="#">
                  SEE MORE
                </Link>
              </div>
              <p>
                All of this is available at a quite reasonable price so that
                everyone can have their own glorious and lush plants set-up at
                their loving abode.
              </p>
              <div className="dis-grid catagories-container--card margin-t-16">
                {homeProducts?.bestSellers.map((product) => (
                  <ProductCard
                    product={product}
                    key={product._id}
                    handleProductDetail={handleProductDetail}></ProductCard>
                ))}
              </div>
            </section>
          </>
        )}
        {status === "ERROR" && <Error setStatus={setStatus} />}
      </div>
    </>
  );
};

import { useEffect, useState } from "react";
import wapperbackground from "../../assests/images/wall.png";
import "./home.css";
import { ProductCard } from "../../components/ProductCard";
import { useRequest } from "../../Utils/request";
import { useStatus } from "../../Context/LoaderContext";
import { Link, useNavigate } from "react-router-dom";
import { Loader } from "../../components/Loader";

export const Home = () => {
  const { request, getCancelToken } = useRequest();
  const navigate = useNavigate();
  const [homeProducts, setHomeProducts] = useState();
  const { status, setStatus } = useStatus();

  const handleProductDetail = (id) => {
    navigate(`/productdetail/${id}`);
  };

  useEffect(() => {
    const cancelToken = getCancelToken();
    (async () => {
      setStatus("PENDING");
      try {
        const { data, success } = await request({
          method: "GET",
          endpoint: "/home",
          cancelToken: cancelToken.token,
        });
        if (success) {
          setStatus("IDLE");
          setHomeProducts(data);
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
      <div className="column align-center route-cont home-container">
        {status !== "IDLE" && <Loader />}
        {status === "IDLE" && homeProducts && (
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
                    details={product}
                    showAddToCart={false}
                    showAddTOWishlist={false}
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
                    details={product}
                    showAddToCart={false}
                    showAddTOWishlist={false}
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
              <p>
                All of this is available at a quite reasonable price so that
                everyone can have their own glorious and lush plants set-up at
                their loving abode.
              </p>
              <div className="dis-grid catagories-container--card margin-t-16">
                {homeProducts?.tools.map((product) => (
                  <ProductCard
                    details={product}
                    showAddToCart={false}
                    showAddTOWishlist={false}
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
                    details={product}
                    showAddToCart={false}
                    showAddTOWishlist={false}
                    key={product._id}
                    handleProductDetail={handleProductDetail}></ProductCard>
                ))}
              </div>
            </section>
          </>
        )}
      </div>
    </>
  );
};

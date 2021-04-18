import React from "react";
import wapperbackground from "../../assests/wall.png";
import plant from "../../assests/plant.png";
import "./home.css";
import { Link } from "react-router-dom";
import { ProductCard } from "../../components/ProductCard";
const data = {
  id: "15d688db-630a-4902-aa33-e2f7800045f0",
  name: "Awesome Rubber Fish",
  image: "/static/media/plant1.ddbbcdf5.png",
  price: "603.00",
  category: "Seeds",
  inStock: true,
  fastDelivery: true,
  label: "New",
  rating: 4,
  discount: 0.5,
};
export const Home = () => {
  return (
    <>
      <div className="column align-center route-cont home-container">
        <header className="w12">
          <picture>
            {/* <source media="(min-width:650px)" srcset="img_pink_flowers.jpg" />
                        <source media="(min-width:465px)" srcset="img_white_flower.jpg" /> */}
            <img
              className="responsive-img "
              src={wapperbackground}
              alt="wall background "
            />
          </picture>
        </header>
        <section className="catagories-container w12 padding-16 ">
          <div className="row justify-between align-center">
            <h2 className="bold">Deal of the Day</h2>
            <a className="bold text-end btn-link" href="#">
              SEE MORE
            </a>
          </div>
          <p>FlyDryPRO technology with Cool Pass to keep you dry</p>
          <div className="dis-grid catagories-container--card margin-t-16">
            <ProductCard
              product={data}
              showAddToCart={false}
              showAddTOWishlist={false}></ProductCard>
            <ProductCard
              product={data}
              showAddToCart={false}
              showAddTOWishlist={false}></ProductCard>
            <ProductCard
              product={data}
              showAddToCart={false}
              showAddTOWishlist={false}></ProductCard>
            <ProductCard
              product={data}
              showAddToCart={false}
              showAddTOWishlist={false}></ProductCard>
          </div>
        </section>
        <section className="catagories-container w12 padding-16 ">
          <div className="row justify-between align-center">
            <h2 className="bold">Plants</h2>
            <a className="bold text-end btn-link" href="#">
              SEE MORE
            </a>
          </div>
          <p>FlyDryPRO technology with Cool Pass to keep you dry</p>
          <div className="dis-grid catagories-container--card margin-t-16">
            <ProductCard
              product={data}
              showAddToCart={false}
              showAddTOWishlist={false}></ProductCard>
            <ProductCard
              product={data}
              showAddToCart={false}
              showAddTOWishlist={false}></ProductCard>
            <ProductCard
              product={data}
              showAddToCart={false}
              showAddTOWishlist={false}></ProductCard>
            <ProductCard
              product={data}
              showAddToCart={false}
              showAddTOWishlist={false}></ProductCard>
          </div>
        </section>
        <section className="catagories-container w12 padding-16 ">
          <div className="row justify-between align-center">
            <h2 className="bold">Planters</h2>
            <a className="bold text-end btn-link" href="#">
              SEE MORE
            </a>
          </div>
          <p>FlyDryPRO technology with Cool Pass to keep you dry</p>
          <div className="dis-grid catagories-container--card margin-t-16">
            <ProductCard
              product={data}
              showAddToCart={false}
              showAddTOWishlist={false}></ProductCard>
            <ProductCard
              product={data}
              showAddToCart={false}
              showAddTOWishlist={false}></ProductCard>
            <ProductCard
              product={data}
              showAddToCart={false}
              showAddTOWishlist={false}></ProductCard>
            <ProductCard
              product={data}
              showAddToCart={false}
              showAddTOWishlist={false}></ProductCard>
          </div>
        </section>
        <section className="catagories-container w12 padding-16 ">
          <div className="row justify-between align-center">
            <h2 className="bold">Tools</h2>
            <a className="bold text-end btn-link" href="#">
              SEE MORE
            </a>
          </div>
          <p>FlyDryPRO technology with Cool Pass to keep you dry</p>
          <div className="dis-grid catagories-container--card margin-t-16">
            <ProductCard
              product={data}
              showAddToCart={false}
              showAddTOWishlist={false}></ProductCard>
            <ProductCard
              product={data}
              showAddToCart={false}
              showAddTOWishlist={false}></ProductCard>
            <ProductCard
              product={data}
              showAddToCart={false}
              showAddTOWishlist={false}></ProductCard>
            <ProductCard
              product={data}
              showAddToCart={false}
              showAddTOWishlist={false}></ProductCard>
          </div>
        </section>
        <section className="catagories-container w12 padding-16 ">
          <div className="row justify-between align-center">
            <h2 className="bold">Soils Fertilizers</h2>
            <a className="bold text-end btn-link" href="#">
              SEE MORE
            </a>
          </div>
          <p>FlyDryPRO technology with Cool Pass to keep you dry</p>
          <div className="dis-grid catagories-container--card margin-t-16">
            <ProductCard
              product={data}
              showAddToCart={false}
              showAddTOWishlist={false}></ProductCard>
            <ProductCard
              product={data}
              showAddToCart={false}
              showAddTOWishlist={false}></ProductCard>
            <ProductCard
              product={data}
              showAddToCart={false}
              showAddTOWishlist={false}></ProductCard>
            <ProductCard
              product={data}
              showAddToCart={false}
              showAddTOWishlist={false}></ProductCard>
          </div>
        </section>
        <section className="catagories-container w12 padding-16 ">
          <div className="row justify-between align-center">
            <h2 className="bold">Tools</h2>
            <a className="bold text-end btn-link" href="#">
              SEE MORE
            </a>
          </div>
          <p>FlyDryPRO technology with Cool Pass to keep you dry</p>
          <div className="dis-grid catagories-container--card margin-t-16">
            <ProductCard
              product={data}
              showAddToCart={false}
              showAddTOWishlist={false}></ProductCard>
            <ProductCard
              product={data}
              showAddToCart={false}
              showAddTOWishlist={false}></ProductCard>
            <ProductCard
              product={data}
              showAddToCart={false}
              showAddTOWishlist={false}></ProductCard>
            <ProductCard
              product={data}
              showAddToCart={false}
              showAddTOWishlist={false}></ProductCard>
          </div>
        </section>
      </div>
    </>
  );
};

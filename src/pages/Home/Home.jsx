import React from "react";
import wapperbackground from '../../assests/bg_about.jpg'
import plant from "../../assests/plant.png"
import "./home.css"
import { Link } from "react-router-dom"
export const Home = () => {
    return( 
        <>
            <div className="dis-grid route-cont home-container" >
                <header className="item-a bor-rad-8">
                    <h1 className="wall-txt txt-center" >Plants Goona Make People Happy</h1>
                    <picture>
                        {/* <source media="(min-width:650px)" srcset="img_pink_flowers.jpg" />
                        <source media="(min-width:465px)" srcset="img_white_flower.jpg" /> */}
                        <img className="responsive-img bor-rad-8  box-shd" src={wapperbackground} alt="Flowers" />
                    </picture>
                </header>
                <section className="item-b">
                    <h2 className="bold" >Categories</h2>
                    <div className="row justify-between">
                        <Link to={{ pathname:"/explore", search:`?catagories=["Plants"]` }} >
                            <div class="catagory-card bor-rad-8 box-shd">
                                <img src={plant} class="responsive-img bor-rad-8" alt="Plant catagory"/>
                                <h3>Plants</h3>
                            </div>
                        </Link>
                        <Link to={{pathname:"/explore", search:`?catagories=["Seeds"]` }} >
                            <div class="catagory-card bor-rad-8 box-shd">
                                <img src={plant} class="responsive-img bor-rad-8" alt="Seeds Catagory"/>
                                <h3>Seeds</h3>
                            </div>
                        </Link>
                        <Link to={{pathname:"/explore", search:`?catagories=["Cactus"]` }}>
                            <div class="catagory-card bor-rad-8 box-shd">
                                <img src={plant} class="responsive-img bor-rad-8" alt="Cactus Catagory"/>
                                <h3>Cactus</h3>
                            </div>
                        </Link>
                        <Link to={{pathname:"/explore", search:`?catagories=["Flowers"]` }} >
                            <div class="catagory-card bor-rad-8 box-shd">
                                <img src={plant} class="responsive-img bor-rad-8" alt="Flowers catagory"/>
                                <h3>Flowers</h3>
                            </div>
                        </Link>
                    </div>
                </section>
            </div>
        </>
    );
};

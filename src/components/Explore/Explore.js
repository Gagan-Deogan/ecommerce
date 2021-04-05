import React, { useState, useEffect } from "react";
import axios from "axios";
import { ProductCard } from "./ProductCard";
import { useCartContext } from "../Context/CartContext";
import { useStatus } from "../Context/LoaderContext";
import { useSnakbarContext } from "../Context/SnakbarContext";
import { useDebouncing } from "../Utils/Debouncing";
import { FiltersMenu } from "./FiltersMenu";
import { useQuery } from "../Utils/Query";
import { getSortedData, getFilterByCatagories, getProductByRating, getFilterbyAvalibility } from "./filters";
import "./explore.css";



export const Explore = () => {
    const { query, queryParser } = useQuery()
    const [products, setProducts] = useState([]);
    const { cartList, wishList, cartDispatch } = useCartContext();
    const { status, setStatus } = useStatus();
    const { snakbarDispatch } = useSnakbarContext()

    const sortBy = queryParser(query.get("sort"))
    const showCatagoeries = queryParser(query.get("catagories")) || []
    const shownRating = queryParser(query.get("shownrating"))
    const showInvertory = queryParser(query.get("showInvertory")) !== null ? queryParser(query.get("showInvertory")) : true;
    const productWithFlags = (() =>{
        const productsIdInCart = cartList.map( (item) => item.id )
        const productsIdInWishList = wishList.map( (item)=> item.id );
        return products.map( (product) => { 
            const productWithInCartFlag = productsIdInCart.includes( product.id ) ? { ...product, inCart:true } :  product 
            return productsIdInWishList.includes( productWithInCartFlag.id ) ? { ...productWithInCartFlag, inWish: true } : productWithInCartFlag
        });
    })()

    const catagoryReducer = (acc, value ) => !acc.includes(value) ? acc.concat([value]) : acc ;
    const catagoryInList = products.map(product => product["category"]).reduce(catagoryReducer, [])
    
    const sortedData = getSortedData(productWithFlags, sortBy )

    const selectedCatagoriesData = getFilterByCatagories(sortedData, showCatagoeries)
    
    const filterByRating = getProductByRating(selectedCatagoriesData,shownRating);
    const filterData = getFilterbyAvalibility( filterByRating, showInvertory)

    const handleAddToCart = (product) =>{
        cartDispatch({type:"ADD_TO_CART", payload:product})
        snakbarDispatch({ type:"SUCCESS", payload:"Added To Cart" })
    }

    const handleWishList = ( product ) =>{
        const wishType = product.inWish ? "REMOVE_FROM_WISHLIST" : "ADD_TO_WISHLIST" ;
        const wishPayload = product.inWish ? product.id  : product ;
        const sankbarMsg = product.inWish ? "Succesfull Removed from Wishlist" : "Succesfull Added to Wishlist" 
        cartDispatch({ type: wishType, payload: wishPayload });
        snakbarDispatch({ type:"DEFAULT" , payload: sankbarMsg });
    }
    const betterHandleWishList = useDebouncing( handleWishList, 500 )
    
    // For calling end points....
    useEffect(() => {
        const cancelTokenSource = axios.CancelToken.source();
        (async () => {
            setStatus("PENDING");
            try {
                const { data } = await axios.get("/api/products",{
                    cancelToken: cancelTokenSource.token
                });
                setStatus("IDLE")
                if (data.products) {
                    setProducts(data["products"]);
                } else {
                    console.log("some thing went worng.");
                }
            } catch (err) {
                setStatus("IDLE")
            }
        })()
        return ()=>{
            cancelTokenSource.cancel()
        }
    }, []);

    return (
        <>  
            {status === "PENDING" ? (
                <div id="dots1">
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            ) : (
                <>
                    <section className="route-container row alg-str jst-ctr w12 pad-8 pad-t-32">
                        <FiltersMenu catagoryInList={catagoryInList} sortBy={sortBy} showCatagoeries={showCatagoeries} shownRating={shownRating} showInvertory={showInvertory} />
                        <div className="dis-grid product-container" >
                            {filterData && filterData.map((product) => <ProductCard product={product} key={product.id}  handleAddToCart={handleAddToCart} betterHandleWishList={betterHandleWishList} />)}
                        </div>
                    </section>
                </>
            ) }
        </>
    );
};

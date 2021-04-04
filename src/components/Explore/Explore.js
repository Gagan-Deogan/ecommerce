import React, { useState, useEffect, useReducer } from "react";
import axios from "axios";
import { ProductCard } from "./ProductCard";
import { useCartContext } from "../Context/CartContext";
import { useStatus } from "../Context/LoaderContext";
import { useSnakbarContext } from "../Context/SnakbarContext";
import { useDebouncing } from "../Utils/Debouncing";
import { FiltersMenu } from "./FiltersMenu";
import { useLocation } from "react-router-dom"
import { getSortedData, getFilterByCatagories, getProductByRating, getFilterbyAvalibility } from "./filters";
import "./explore.css";

const reducer = (state, action)=>{
    switch(action.type){
        case "SORT":
            return {...state, sortBy:action.payload };
        case "TOGGLE_INVENTORY":
            return { ...state, showInvertory: !state.showInvertory }
        case "SHOW_THESE_CATAGORIES":
            const newShowCatagories = state.showCatagoeries.includes(action.payload) ? state.showCatagoeries.filter((catagory)=> catagory !== action.payload ) : state.showCatagoeries.concat([action.payload])
            return { ...state, showCatagoeries: newShowCatagories }
        case "FIILTER_BY_RATINGS":
            return { ...state, showRating: action.payload  }
        default:
            return state;
    }
}
const useQuery = () => {
    return new URLSearchParams(useLocation().search);
}
export const Explore = () => {
    const query = useQuery()
    const [products, setProducts] = useState([]);
    const { cartList, wishList, cartDispatch } = useCartContext();
    const { status, setStatus } = useStatus();
    const { snakbarDispatch } = useSnakbarContext()
    const sortBy = query.get("sort")
    const parseCatagories = (catagories)=>{
        try{
            return JSON.parse(catagories) || [] ;
        }catch(err){
            return [];
        }
    }
    const showCatagoeries = parseCatagories(query.get("catagories"))
    const [{ showInvertory, showRating}, filtersDispatch ] = useReducer( reducer ,{ showInvertory:true, showRating:null } )
    
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
    
    const filterByRating = getProductByRating(selectedCatagoriesData,showRating);
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
                        <FiltersMenu filtersDispatch={filtersDispatch} catagoryInList={catagoryInList} showInvertory={showInvertory}    sortBy={sortBy} showCatagoeries={showCatagoeries} />
                        <div className="dis-grid product-container" >
                            {filterData && filterData.map((product) => <ProductCard product={product} handleAddToCart={handleAddToCart} betterHandleWishList={betterHandleWishList} />)}
                        </div>
                    </section>
                </>
            ) }
        </>
    );
};

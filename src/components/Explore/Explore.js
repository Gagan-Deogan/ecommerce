import React, { useState, useEffect, useReducer } from "react";
import axios from "axios";
import { ProductCard } from "./ProductCard";
import { useCartContext } from "../Context/CartContext";
import { useStatus } from "../Context/LoaderContext";
import { useSnakbar } from "../Context/SnakbarContext";
import { useDebouncing } from "../Utils/Debouncing";
import { getSortedData, getFilterByCatagories, getProductByRating, getFilterbyAvalibility } from "./filters";
import "./explore.css";

const reducer = (state, action)=>{
    switch(action.type){
        case "SORT":
            return {...state, sortBy:action.payload };
        case "TOGGLE_INVENTORY":
            return { ...state, showInvertory: !state.showInvertory }
        case "SHOW_THIS_CATAGORIES_ONLY":
            const newShowCatagories = state.showCatagoeries.includes(action.payload) ? state.showCatagoeries.filter((catagory)=> catagory !== action.payload ) : state.showCatagoeries.concat([action.payload])
            return { ...state, showCatagoeries: newShowCatagories }
        case "FIILTER_BY_RATINGS":
            return { ...state, showRating: action.payload  }
        default:
            return state;
    }
}

export const Explore = () => {
    const [products, setProducts] = useState([]);
    const { cartList, wishList, cartDispatch } = useCartContext();
    const { status, setStatus } = useStatus();
    const { snakbarDispatch } = useSnakbar()
    const [{ showInvertory, sortBy, showCatagoeries, showRating}, dispatch ] = useReducer( reducer ,{ showInvertory:true, sortBy:null, showCatagoeries:[], showRating:null } )
    
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
            console.log("hello")
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
                    <h1 className="bold">Explore</h1>
                    <div className="row alg-str">
                        <div className="col ftr-cont bor-rad-8 mag-t-16 pad-t-16 box-shd ">
                            <h2 className="bold mag-l-16" >Filters</h2>
                            <fieldset className="col pad-16 pad-t-8" >
                                <h5 className="bold gry" >SORT BY:</h5>
                                <label className="row jst-spa-btw mag-t-8 alg-ctr">
                                    <span>Price Low-high</span>
                                    <input type="radio" name="sort" onClick={()=>dispatch({type:"SORT", payload:"LH"})} />
                                    <div className="check"></div>
                                </label>
                                <label className="row jst-spa-btw mag-t-8 alg-ctr" >
                                    <span >Price High-Low</span>
                                    <input type="radio" name="sort" onClick={()=>dispatch({type:"SORT", payload:"HL"})} />
                                    <div className="check"></div>
                                </label>
                            </fieldset>
                            { catagoryInList && (
                                <fieldset className="col pad-16 pad-t-8" >
                                    <h5 className="bold gry" >CATAGORY</h5>
                                    { catagoryInList.map((catagory)=> (
                                        <label className="row jst-spa-btw mag-t-8 alg-ctr">
                                            <span>{catagory}</span>
                                            <input type="checkbox" name={catagory} onClick={()=>dispatch({type:"SHOW_THIS_CATAGORIES_ONLY", payload: catagory })} />
                                            <div className="check"></div>
                                        </label>
                                    )) }
                                </fieldset>
                            ) }
                            <fieldset className="col pad-16 pad-t-8" >
                                <h5 className="bold gry" >CUSTOMER RATINGS</h5>
                                <label className="row jst-spa-btw mag-t-8 alg-ctr">
                                    <span>4★ & above</span>
                                    <input type="radio" name="rating" onClick={()=>dispatch({type:"FIILTER_BY_RATINGS", payload:4})} />
                                    <div className="check"></div>
                                </label>
                                <label className="row jst-spa-btw mag-t-8 alg-ctr">
                                    <span>3★ & above</span>
                                    <input type="radio" name="rating" onClick={()=>dispatch({type:"FIILTER_BY_RATINGS", payload:3})} />
                                    <div className="check"></div>
                                </label>
                                <label className="row jst-spa-btw mag-t-8 alg-ctr">
                                    <span>2★ & above</span>
                                    <input type="radio" name="rating" onClick={()=>dispatch({type:"FIILTER_BY_RATINGS", payload:2})} />
                                    <div className="check"></div>
                                </label>
                                <label className="row jst-spa-btw mag-t-8 alg-ctr">
                                    <span>1★ & above</span>
                                    <input type="radio" name="rating" onClick={()=>dispatch({type:"FIILTER_BY_RATINGS", payload:1})} />
                                    <div className="check"></div>
                                </label>
                            </fieldset>
                            <fieldset className="col pad-16 pad-t-8">
                                <h5 className="bold mag-b-8 gry" >AVAILABILITY</h5>
                                <label className="row jst-spa-btw alg-ctr mag-t-8" >
                                    <span>Include out of Stock</span> 
                                    <input type="checkbox" onChange={()=> dispatch({ type:"TOGGLE_INVENTORY" })} checked={showInvertory} ></input>
                                    <div className="check"></div>
                                </label>
                            </fieldset>
                        </div>
                        <div className="row flx-wrp jst-str" >
                            {filterData && filterData.map((product) => <ProductCard product={product} handleAddToCart={handleAddToCart} betterHandleWishList={betterHandleWishList} />)}
                        </div>
                    </div>
                </>
            ) }
        </>
    );
};

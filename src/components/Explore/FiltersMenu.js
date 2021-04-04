import React from "react";
import { useNavigate } from "react-router-dom";
export const FiltersMenu = ( {filtersDispatch, catagoryInList, showInvertory, sortBy, showCatagoeries } ) =>{
    const navigate = useNavigate()
    return (
        <div className="col ftr-cont bor-rad-8 mag-r-32 pad-t-16 box-shd ">
            <h2 className="bold mag-l-16" >Filters</h2>
            <fieldset className="col pad-16 pad-t-8" >
                <h5 className="bold gry" >SORT BY:</h5>
                <label className="row jst-spa-btw mag-t-8 alg-ctr">
                    <span>Price Low-high</span>
                    <input type="radio" name="sort" checked={ sortBy==="LH" ? true : false }  onChange={()=> navigate(`/explore?sort=LH&catagories=${JSON.stringify(showCatagoeries)}`) } />
                    <div className="check"></div>
                </label>
                <label className="row jst-spa-btw mag-t-8 alg-ctr" >
                    <span >Price High-Low</span>
                    <input type="radio" name="sort" checked={ sortBy === "HL" ? true : false }  onChange={()=>navigate(`/explore?sort=HL&catagories=${JSON.stringify(showCatagoeries)}`)} />
                    <div className="check"></div>
                </label>
            </fieldset>
            { catagoryInList && (
                <fieldset className="col pad-16 pad-t-8" >
                    <h5 className="bold gry" >CATAGORY</h5>
                    { catagoryInList.map((catagory)=> (
                        <label className="row jst-spa-btw mag-t-8 alg-ctr">
                            <span>{catagory}</span>
                            <input type="checkbox" name={catagory} checked={showCatagoeries.includes(catagory)} onChange={()=>filtersDispatch({type:"SHOW_THESE_CATAGORIES", payload: catagory })} />
                            <div className="check"></div>
                        </label>
                    )) }
                </fieldset>
            ) }
            <fieldset className="col pad-16 pad-t-8" >
                <h5 className="bold gry" >CUSTOMER RATINGS</h5>
                <label className="row jst-spa-btw mag-t-8 alg-ctr">
                    <span>4★ & above</span>
                    <input type="radio" name="rating" onClick={()=>filtersDispatch({type:"FIILTER_BY_RATINGS", payload:4})} />
                    <div className="check"></div>
                </label>
                <label className="row jst-spa-btw mag-t-8 alg-ctr">
                    <span>3★ & above</span>
                    <input type="radio" name="rating" onClick={()=>filtersDispatch({type:"FIILTER_BY_RATINGS", payload:3})} />
                    <div className="check"></div>
                </label>
                <label className="row jst-spa-btw mag-t-8 alg-ctr">
                    <span>2★ & above</span>
                    <input type="radio" name="rating" onClick={()=>filtersDispatch({type:"FIILTER_BY_RATINGS", payload:2})} />
                    <div className="check"></div>
                </label>
                <label className="row jst-spa-btw mag-t-8 alg-ctr">
                    <span>1★ & above</span>
                    <input type="radio" name="rating" onClick={()=>filtersDispatch({type:"FIILTER_BY_RATINGS", payload:1})} />
                    <div className="check"></div>
                </label>
            </fieldset>
            <fieldset className="col pad-16 pad-t-8">
                <h5 className="bold mag-b-8 gry" >AVAILABILITY</h5>
                <label className="row jst-spa-btw alg-ctr mag-t-8" >
                    <span>Include out of Stock</span> 
                    <input type="checkbox" onChange={()=> filtersDispatch({ type:"TOGGLE_INVENTORY" })} checked={showInvertory} ></input>
                    <div className="check"></div>
                </label>
            </fieldset>
        </div>
    )
} 
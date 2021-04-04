import React, { useState } from 'react'
import "./cart.css"
import starIcon from '../../assests/star.svg'
import fav from "../../assests/fav.svg";
import favFil from "../../assests/fav-fil.svg";
import addIcon from "../../assests/add.svg"
import removeIcon from "../../assests/remove.svg"
import { discountCalculator } from "../Utils/DiscountCalculator"
export const CartCard = ({product, handleRemoveFromCart, handleQuantityChange, handleSaveForLater })=> {
    return (
        <div className="row crd-cont row typ-vrt hov-box-shd bor-rad-8 bor-sol cart-card">
            { product.label && (
                <div className="crd-badge">
                    <span>{product.label}</span>
                </div>
            )}
            <img src={product.image} className="w5 bor-rad-8" alt=""/>
            <div className="col crd-title eight">
                <h3>{product.name}</h3>
                <div className="row alg-ctr ">
                    {product.discount ? (
                        <>
                            <h4 className="bold mag-r-4 ">{"Rs. "+ discountCalculator(product.discount, product.price) }</h4>
                            <h6 className="bold gry txt-line-thro"> {"Rs. " + product.price}</h6>
                        </>
                    ):(
                        <h5 className="bold mag-r-4 ">{"Rs. "+ product.price }</h5>
                    ) }
                </div>
                <div className="row alg-ctr mag-t-16 mag-b-16" >
                    <h5>Quanitity {product.quantity}</h5>
                    <button className="link-btn mag-l-8" onClick={ ()=>{ 
                        handleQuantityChange( "DECREMENT_QUANTITY", product.id )
                    }} >
                        <img src={removeIcon} alt=""/>
                    </button>
                    <button className="link-btn mag-r-8" onClick={()=> handleQuantityChange( "INCREMENT_QUANTITY", product.id ) } > 
                        <img src={addIcon} alt=""/>
                    </button>
                </div>
                <div className="row mag-t-16" >
                    <button className="sm-btn-pry" onClick={ ()=> handleRemoveFromCart(product.id) } >
                        Remove from Cart
                    </button>
                    <button className="sm-btn-pry mag-l-8" onClick={ ()=>handleSaveForLater(product) }  >
                        Save for later
                    </button>
                </div>
            </div>
            <div className="crd-ratg row">
                <h6 className="bold mag-r-4">{product.rating}</h6>
                <img src={starIcon} alt="Star icon"/>
            </div>
        </div>
    )
}


import React, { useState } from 'react'
import "./cart.css"
import starIcon from '../../assests/star.svg'
import fav from "../../assests/fav.svg";
import favFil from "../../assests/fav-fil.svg";
import addIcon from "../../assests/add.svg"
import removeIcon from "../../assests/remove.svg"
export const CartCard = ({product, handleRemoveFromCart, handleQuantityChange })=> {
    return (
        <div className="row crd-cont row typ-vrt hov-box-shd bor-rad-8 bor-sol cart-card">
            <div className="crd-badge">
                <span>{product.label}</span>
            </div>
            <img src={product.image} className="w5 bor-rad-8" alt=""/>
            <div className="col crd-title eight">
                <h4>{product.name}</h4>
                <h6 className="bold" >Rs. {product.price}</h6>
                <div className="row alg-ctr mag-t-16 mag-b-16" >
                    <button className="link-btn mag-l-8" onClick={ ()=>{ 
                        handleQuantityChange( "DECREMENT_QUANTITY", product.id )
                    }} >
                        <img src={removeIcon} alt=""/>
                    </button>
                    {' '}<input type='text' className="cart-cart--quality" value={product.quantity} />{' '}
                    <button className="link-btn mag-r-8" onClick={()=> handleQuantityChange( "INCREMENT_QUANTITY", product.id ) } > 
                        <img src={addIcon} alt=""/>
                    </button>
                </div>
                <button className="sm-btn-pry" onClick={ ()=> handleRemoveFromCart(product.id) } >
                    Remove form Cart
                </button>
            </div>
            <button className="icn-btn crd-wish" >
                <img src={fav} alt=""/>
            </button>
            <div className="crd-ratg row">
                <h6 className="bold mag-r-4">{product.rating}</h6>
                <img src={starIcon} alt="Star icon"/>
            </div>
        </div>
    )
}


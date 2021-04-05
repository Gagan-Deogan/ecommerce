import React from "react";
import { useCartContext } from "../Context/CartContext"
import { CartCard } from "./CartCard";
import { useSnakbarContext } from "../Context/SnakbarContext"
export const Cart = () => {
    const { cartList, cartDispatch } = useCartContext();
    const { snakbarDispatch } = useSnakbarContext()
    const handleRemoveFromCart = (id) =>{
        cartDispatch({type:"REMOVE_FROM_CART", payload:id })
        snakbarDispatch({type:"ERROR", payload:"Product Remove Succesfully" })
    }
    const handleQuantityChange = ( type, id ) =>{
        cartDispatch({type:type, payload:id })
    }
    const priceReducer = (acc,value) =>{
        const discountedPrice = value.price - value.discount*value.price;
        return acc + Math.floor(discountedPrice) * value.quantity;
    }
    const handleSaveForLater = ( product )=>{
        cartDispatch({type:"SAVE_FOR_LATER", payload:product})
    }
    const totalPrice = cartList.reduce( priceReducer, 0 )

    return (
        <>
            <section className="col route-container w12 alg-ctr jst-str" >
                <h1 className='bold w12'>Cart</h1>
                <ul className="box-shd md-w12 w8 drop-down-menu col items-list bor-rad-8 mag-t-16">
                    { cartList.map( (product) => (
                        <CartCard product={ product } handleRemoveFromCart={ handleRemoveFromCart } handleQuantityChange={handleQuantityChange} handleSaveForLater={handleSaveForLater} ></CartCard>
                    ))}
                </ul>
                <h2 className="mag-t-16" >Total: {totalPrice}</h2>
            </section>
        </>
    )
};

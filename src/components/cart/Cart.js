import React from "react";
import { useCartContext } from "../Context/CartContext"
import { CartCard } from "./CartCard";
import { useSnakbar } from "../Context/SnakbarContext"
export const Cart = () => {
    const { cartList, cartDispatch } = useCartContext();
    const { snakbarDispatch } = useSnakbar()
    const handleRemoveFromCart = (id) =>{
        cartDispatch({type:"REMOVE_FROM_CART", payload:id })
        snakbarDispatch({type:"ERROR", payload:"Product Remove Succesfully" })
    }
    const handleQuantityChange = ( type, id ) =>{
        console.log(type, id)
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
            <h1 className='bold'>Cart</h1>
            <section className="row flx-wrp w12">
                { cartList.map( (product) => (
                    <CartCard product={ product } handleRemoveFromCart={ handleRemoveFromCart } handleQuantityChange={handleQuantityChange} handleSaveForLater={handleSaveForLater} ></CartCard>
                ))}
            </section>
            <h1>Total: {totalPrice}</h1>
        </>
    )
};

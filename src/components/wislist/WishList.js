import React from 'react';
import "./wishlist.css"
import {ProductCard} from '../Explore/ProductCard'
import { useCartContext } from '../Context/CartContext';

export const WishList = () =>{
    const { wishList, cartList } = useCartContext();
    const wishListWithFlag = (() =>{
        const productsIdInCart = cartList.map( (item) => item.id )
        return wishList.map( ( product ) => productsIdInCart.includes(product.id) ? {...product , inCart: true } : product )
    })()
    return(
        <>  
        <section className="route-container col w12 alg-str jst-str" >
            <h1 className="title-txt w12" >WishList</h1>
            <ul className="dis-grid product-container wishlist-item mag-t-16 " >
                {wishListWithFlag.map((product) => (
                    <ProductCard product={product} inWishList={true} ></ProductCard>
                )) }
            </ul>
        </section>
        </>
    )
}
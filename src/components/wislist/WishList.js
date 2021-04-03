import React from 'react';
import {ProductCard} from '../Explore/ProductCard'
import { useCartContext } from '../Context/CartContext';

export const WishList = () =>{
    const { wishList } = useCartContext();
    console.log(wishList)
    return(
        <>
            <h1>WishList</h1>
            <div className="row flx-wrp jst-str" >
                {wishList.map((product) => (
                    <ProductCard product={product} ></ProductCard>
                )) }
            </div>
        </>
    )
}
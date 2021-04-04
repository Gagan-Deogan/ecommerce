import React, { useReducer, createContext, useContext} from 'react';
const CartContext = createContext();

//cartreducer
export const cartReducer = (state, action)=>{
    switch(action.type){
        case "ADD_TO_CART":
            return {...state, cartList:[ ...state.cartList , { ...action.payload, quantity:1, inCart:true } ] };
        case "REMOVE_FROM_CART":
            return {...state, cartList: state.cartList.filter((product)=> product.id !== action.payload ) };
        case "INCREMENT_QUANTITY":
            return {...state, cartList: state.cartList.map( (product) => product.id === action.payload ? { ...product, quantity : product.quantity + 1 } : product ) };
        case "DECREMENT_QUANTITY":
            return {...state, cartList: state.cartList.map( (product) => product.id === action.payload && product.quantity > 1 ? { ...product, quantity : product.quantity - 1 } : product ) };
        case "ADD_TO_WISHLIST":
            return { ...state, wishList:[ ...state.wishList, { ...action.payload, inWish:true } ] };
        case "REMOVE_FROM_WISHLIST":
            return {...state, wishList: state.wishList.filter(product => product.id !== action.payload ) };
        case "SAVE_FOR_LATER":
            const saveProduct = action.payload
            const productSaveForLater = {cartList: state.cartList.filter((product)=> product.id !== saveProduct.id ), wishList: state.wishList.concat([{...saveProduct, inWish:true, quantity : 0, inCart:false }]) }
            return {...productSaveForLater};
        default :
        return state;
    }
}
const intialState = { cartList:[], wishList:[] }

export const CartContextProvider = ({children}) =>{
    const [{ cartList, wishList } , cartDispatch ] = useReducer(cartReducer, intialState );
    return(
        <CartContext.Provider
            value={{
                cartList:cartList,
                wishList:wishList,
                cartDispatch:cartDispatch
            }}
        >
            {children}
        </CartContext.Provider>
    )
}

// custome hook
export const useCartContext = () => {
    return useContext(CartContext)
}
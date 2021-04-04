import star from "../../assests/star.svg";
import fav from "../../assests/fav.svg";
import favFil from "../../assests/fav-fil.svg";
import { discountCalculator } from "../Utils/DiscountCalculator";
import { useDebouncing } from "../Utils/Debouncing";
import { useCartContext } from "../Context/CartContext";
import { useSnakbarContext } from "../Context/SnakbarContext";
export const ProductCard = ({ product }) => {
    const { cartDispatch } = useCartContext();
    const { snakbarDispatch } = useSnakbarContext();
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
    return (
        <div
            key={product.id}
            className="col crd-cont pos-r hov-box-shd bor-rad-8 bor-sol box-shd"
        >   
            { !!product.label &&
                <div className="crd-badge">
                    <span>{product.label}</span>
                </div>
            }
            <img
                src={product.image}
                className="w12 bor-rad-8 "
                alt={product.name}
            />
            <div className="col crd-title">
                <h4>{product.name}  </h4>
                <div className="row alg-ctr ">
                    {product.discount ? (
                        <>
                            <h5 className="bold mag-r-4 ">{"Rs. "+ discountCalculator(product.discount, product.price) }</h5>
                            <h6 className="bold gry txt-line-thro"> {"Rs. " + product.price}</h6>
                        </>
                    ):(
                        <h5 className="bold mag-r-4 ">{"Rs. "+ product.price }</h5>
                    ) }
                </div>
                <button
                    className={
                        !product.inStock || product.inCart ? "sm-btn-pry-fil btn-dis" : "sm-btn-pry-fil"
                    }
                    onClick = {()=>handleAddToCart(product)}
                    disabled = { !product.inStock || product.inCart ? true : false }
                >
                { product.inCart ? 'IN CART' : !product.inStock ? "SOLD OUT" : "ADD TO CART" }
                </button>
            </div>
            <button className="icn-btn crd-wish" onClick={()=> betterHandleWishList(product)} >
                <img src={product.inWish ? favFil : fav } alt="" />
            </button>
            <div className="crd-ratg row">
                <h6 className="bold mag-r-4">{product.rating}</h6>
                <img src={star} alt="Star icon" />
            </div>
        </div>
    );
};

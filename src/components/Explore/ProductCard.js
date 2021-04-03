import star from "../../assests/star.svg";
import fav from "../../assests/fav.svg";
import favFil from "../../assests/fav-fil.svg";
export const ProductCard = ({ product, handleAddToCart, betterHandleWishList }) => {
    return (
        <div
            key={product.id}
            className="col crd-cont pos-r hov-box-shd bor-rad-8 bor-sol"
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
                <h4>{product.name}</h4>
                <h6 className="bold">{"Rs. " + product.price}</h6>
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

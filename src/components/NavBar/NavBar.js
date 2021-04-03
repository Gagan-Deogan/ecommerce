import React from 'react'
import homeIcon from '../../assests/home.svg'
import cartIcon from '../../assests/shopping-cart.svg'
import exploreIcon from '../../assests/explore.svg'
import wishIcon from '../../assests/wishlist.svg'
import { useHistory } from "react-router-dom"
import "./navbar.css"
export const NavBar = () => {
    const history = useHistory();
    return (
        <nav className='col alg-ctr' >
            <button className="link-btn mag-t-64" onClick={()=> history.push("/home")}  > <img src={homeIcon} alt=""/> </button>
            <button className="link-btn mag-t-16" onClick={()=> history.push("/explore")} > <img src={exploreIcon} alt=""/> </button>
            <button className="link-btn mag-t-16" onClick={()=> history.push("/wishlist")} > <img src={wishIcon} alt=""/> </button>
            <button className="link-btn mag-t-16" onClick={()=> history.push("/cart")} > <img src={cartIcon} alt=""/> </button>
        </nav>
    )
}


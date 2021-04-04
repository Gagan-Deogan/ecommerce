import React from 'react'
import homeIcon from '../../assests/home.svg'
import cartIcon from '../../assests/shopping-cart.svg'
import exploreIcon from '../../assests/explore.svg'
import wishIcon from '../../assests/wishlist.svg'
import { useCartContext } from "../Context/CartContext"
import { NavLink } from "react-router-dom"
import "./navbar.css"
export const NavBar = () => {
    const { cartList, wishList } = useCartContext();
    return (
        <nav className='col alg-ctr' >
            <NavLink 
                to={{pathname:'/home'}}
                className="link-btn mag-t-64"
                activeStyle={{background:'var(--background)'}}
            >
                    <img src={homeIcon} alt=""/>
            </NavLink>
            <NavLink 
                to={{pathname:'/explore'}}
                className="link-btn mag-t-16" 
                activeStyle={{background:'var(--background)'}}
                > 
                <img src={exploreIcon} alt=""/>
            </NavLink>
            <NavLink 
                to={{pathname:'/wishlist'}}
                className="link-btn mag-t-16" 
                activeStyle={{background:'var(--background)'}}
            >
                <img src={wishIcon} alt=""/>
                { !!wishList.length && (<span class="bdge" >{wishList.length}</span> ) }
            </NavLink>
            <NavLink 
                to={{pathname:'/cart'}}
                className="link-btn mag-t-16" 
                activeStyle={{background:'var(--background)'}}
                > 
                <img src={cartIcon} alt=""/> 
                { !!cartList.length && (<span class="bdge" >{cartList.length}</span> ) }
            </NavLink>
        </nav>
    )
}


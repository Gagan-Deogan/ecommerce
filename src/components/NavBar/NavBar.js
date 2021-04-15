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
        <nav className='column align-center box-shd' >
            <NavLink
                end
                to={{pathname:'/'}}
                className="btn-link margin-t-64"
                activeStyle={{background:'var(--background)'}}
            >
                    <img src={homeIcon} alt=""/>
            </NavLink>
            <NavLink 
                to={{pathname:'/explore'}}
                className="btn-link margin-t-16" 
                activeStyle={{background:'var(--background)'}}
                > 
                <img src={exploreIcon} alt=""/>
            </NavLink>
            <NavLink 
                to={{pathname:'/wishlist'}}
                className="btn-link margin-t-16" 
                activeStyle={{background:'var(--background)'}}
            >
                <img src={wishIcon} alt=""/>
                { !!wishList.length && (<span class="badge" >{wishList.length}</span> ) }
            </NavLink>
            <NavLink 
                to={{pathname:'/cart'}}
                className="btn-link margin-t-16" 
                activeStyle={{background:'var(--background)'}}
                > 
                <img src={cartIcon} alt=""/> 
                { !!cartList.length && (<span class="badge" >{cartList.length}</span> ) }
            </NavLink>
        </nav>
    )
}


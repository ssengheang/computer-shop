import React from "react"
import{Link} from "react-router-dom"
import{ShoppingCart} from 'phosphor-react'
import "./navbar.css"

export const Navbar = () =>{
    const handleLogout = () => {
        const token = localStorage.removeItem("ACCESS_TOKEN");
        return window.location.reload();
    }
    return(
        <div className="navbar">
            <header>
                <div>
                    <Link to="/" style={{ 'fontFamily': 'sans-serif', 'fontWeight': 'bold' }}>Computer Shop</Link>
                </div>
                <div style={{display: "flex", justifyContent: "space-between", alignItems: "center", gap: "5rem"}}>
                    <Link to="/cart">               
                        <ShoppingCart></ShoppingCart>
                    </Link>
                <div style={{color: "red", cursor: "pointer"}} onClick={() => handleLogout()}>Logout</div>
                </div>
            </header>
        </div>
    )
}
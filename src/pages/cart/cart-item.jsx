import React, { useContext } from "react";
import{Trash} from 'phosphor-react'
import{Plus} from 'phosphor-react'
import{ShopContext} from "../../context/car-context"

export const CartItem = (props) =>{
    const {id, name, price, images} = props.data;
    const {cartItems, addToCart, removeFromCart} = useContext(ShopContext)

    return(
        <div className="cartItem">
            {images.length > 0 && (<img src={`http://localhost:8000/storage/${images[0].image_path}`} alt="" />)}           
            <div className="description">
                <p>
                    <b>{name}</b>
                </p>
                <p style={{'color': 'red'}}>${price}</p>
                <div className="countHandler">
                    <button onClick={()=> removeFromCart(id)} style={{'cursor': 'pointer'}}><Trash size={21} color="red" /></button>
                    <input value={cartItems[id]}/>
                    <button onClick={()=> addToCart(id)} style={{'cursor': 'pointer'}}><Plus size={21} color="blue" /></button>
                </div>
            </div>
            
        </div>
    )
}
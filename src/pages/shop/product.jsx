import React, { useContext } from "react";
import { ShopContext } from "../../context/car-context";
export const Product = (props) =>{
    const {id, name, price, images} = props.data;
    const {addToCart, cartItems} = useContext(ShopContext);
    const cartItemsAmount = cartItems[id]
    return(
        <div className="product">
            {images.length > 0 && (<img src={`http://localhost:8000/storage/${images[0].image_path}`} alt="" style={{width: "100%", height: "100%"}}/>)}           
             
            <div className="description">
                <p>
                    <b>{name}</b>
                </p>
                <p>${price}</p>
            </div> 
            <button className="addToCart" onClick={()=> addToCart(id)}>
               Add To Cart{cartItemsAmount > 0 && <>({cartItemsAmount})</>}
            </button>
        </div>
    )
}
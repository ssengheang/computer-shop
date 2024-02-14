// import React, { createContext, useEffect, useState } from "react";
// import { PRODUCTS } from "../products";
// export const ShopContext = createContext(null);

// const getDefaultCart = () => {
//   let cart = {};
//   for (let i = 1; i < PRODUCTS.length + 1; i++) {
//     cart[i] = 0;
//   }
//   return cart;
// };
// export const ShopContextProvider = (props) => {
//   const [cartItems, setCartItems] = useState(getDefaultCart());
//   const getTotalCartAmount = () => {
//     let totalAmount = 0;
//     for (const item in cartItems) {
//       if (cartItems[item] > 0) {
//         let itemInfo = PRODUCTS.find((product) => product.id === Number(item));
//         totalAmount += cartItems[item] * itemInfo.price;
//       }
//     }
//     return totalAmount;
//   };

//   const addToCart = (itemId) => {
//     setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
//   };

//   const removeFromCart = (itemId) => {
//     setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
//   };
//   const checkout = () => {
//     setCartItems(getDefaultCart());
//   };

//   const contextValue = {
//     cartItems,
//     addToCart,
//     removeFromCart,
//     getTotalCartAmount,
//     checkout,
//   };
//   return (
//     <ShopContext.Provider value={contextValue}>
//       {props.children}
//     </ShopContext.Provider>
//   );
// };

import React, { createContext, useEffect, useState } from "react";
import axiosClient from "../axios-client";

export const ShopContext = createContext(null);

const ShopContextProvider = (props) => {
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState({});
  const [itemInfo, setItemInfo] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = () => {
      try {
        axiosClient
          .get("/products")
          .then((res) => setProducts(res.data.products.data));
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const getDefaultCart = () => {
    let cart = {};
    for (let i = 1; i < products.length + 1; i++) {
      cart[i] = 0;
    }
    return cart;
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const itemId in cartItems) {
      const itemQuantity = cartItems[itemId];
      let itemInfo = products.find(product => product.id === Number(itemId));
      if (itemInfo && itemQuantity > 0) {
        totalAmount += itemInfo.price * itemQuantity;
      }
    }
    return totalAmount;
  };
  

  const addToCart = (itemId) => {
    console.log("Adding to cart, itemId:", itemId);
    setCartItems((prev) => {
      console.log("Previous state:", prev);
      console.log("Current item quantity (before):", prev[itemId]);
      const updatedQuantity = prev[itemId] ? prev[itemId] + 1 : 1; 
      const updatedCartItems = { ...prev, [itemId]: updatedQuantity };
      console.log("Updated cart items:", updatedCartItems);
      return updatedCartItems;
    });
  };

  const removeFromCart = (itemId) => {
    setCartItems((prev) => ({
      ...prev,
      [itemId]: prev[itemId] > 0 ? prev[itemId] - 1 : 0,
    }));
  };

  const checkout = () => {
    setCartItems(getDefaultCart());
  };

  const contextValue = {
    cartItems,
    products,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    checkout,
    loading,
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;

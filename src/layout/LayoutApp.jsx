// import React from "react";
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
// import { Navbar } from "../components/navbar";
// import ShopContextProvider from "../context/car-context.jsx"
// import { Shop } from "../pages/shop/shop";
// import { Cart } from "../pages/cart/cart";
// import Checkout from "../pages/cart/Checkout.jsx";
// import Footer from "../components/Footer";

// const LayoutApp = () => {
//     return (
//         <ShopContextProvider>
//             <Router>
//                 <Navbar />
//                 <Routes>
//                     <Route path="/" element={<Shop />}></Route>
//                     <Route path="/cart" element={<Cart />}></Route>
//                     <Route path="/checkout" element={<Checkout />}></Route>
//                 </Routes>   
//                 <Footer />
//             </Router>
//         </ShopContextProvider>
//     );
// }

// export default LayoutApp;


import React from "react";
import { Navbar } from "../components/navbar";
import ShopContextProvider from "../context/car-context";
import { Shop } from "../pages/shop/shop";
import { Cart } from "../pages/cart/cart";
import Checkout from "../pages/cart/Checkout";
import Footer from "../components/Footer";
import { Routes, Route } from 'react-router-dom';

const LayoutApp = () => {
    return (
        <ShopContextProvider>
            <Navbar />
            <Routes>
                <Route path="/" element={<Shop />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/checkout" element={<Checkout />} />
            </Routes>
            <Footer />
        </ShopContextProvider>
    );
};

export default LayoutApp;

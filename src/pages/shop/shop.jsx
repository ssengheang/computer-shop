// import React, { createContext, useEffect, useState } from "react";
// import axiosClient from "../../axios-client";
// import { PRODUCTS } from "../../products";
// import { Product } from "./product";
// import "./shop.css";
// import SliderBanner from "../../components/SliderBanner";

// export const Shop = () => {
//   const [products, setProducts] = useState([]);

//   useEffect(() => {
//     const fetchProducts = () => {
//       try {
//         axiosClient.get("/products").then((res) => 
//             setProducts(res.data.products.data)
//         )
//       } catch (error) {
//         console.error("Error fetching products:", error);
//       }
//     };

//     fetchProducts();
//   }, []);

//   return (
//     <div className="style_car">
//       <SliderBanner />
//       <div className="carTitle">
//         <h1>Model Cars</h1>
//       </div>
//       <div className="products">
//         {products.map((product) => (
//           <div key={product.id}>
//             <Product data={product}/>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };


import React, { useState, useEffect } from "react";
import axiosClient from "../../axios-client";
import { Product } from "./product";
import "./shop.css";
import SliderBanner from "../../components/SliderBanner";

export const Shop = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [paginationInfo, setPaginationInfo] = useState({});

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axiosClient.get(`/products?page=${currentPage}`);
        setProducts(response.data.products.data);
        const { current_page, last_page, next_page_url, prev_page_url } = response.data.products;
        setPaginationInfo({
          currentPage: current_page,
          lastPage: last_page,
          nextPageUrl: next_page_url,
          prevPageUrl: prev_page_url,
        });
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [currentPage]);

  return (
    <div className="style_car">
      <SliderBanner />
      <div className="carTitle">
        <h1>Find and Get Your Favorite Computers Here</h1>
      </div>
      <div className="products">
        {products.map((product) => (
          <div key={product.id}>
            <Product data={product} />
          </div>
        ))}
      </div>
      <div className="pagination">
        {paginationInfo.prevPageUrl && (
          <button onClick={() => setCurrentPage(currentPage - 1)} class="btn">Previous</button>
        )}
        {paginationInfo.nextPageUrl && (
          <button onClick={() => setCurrentPage(currentPage + 1)} class="btn">Next</button>
        )}
      </div>
    </div>
  );
};

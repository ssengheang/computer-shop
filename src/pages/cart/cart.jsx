import React, { useContext, useEffect, useState } from "react";
import axiosClient from "../../axios-client";
// Import PRODUCTS if you're using it as a fallback or for testing
import { ShopContext } from "../../context/car-context";
import { CartItem } from "./cart-item";
import "./cart.css";
import { useNavigate } from "react-router-dom";

export const Cart = () => {
  const { cartItems, getTotalCartAmount, checkout } = useContext(ShopContext);
  const totalAmount = getTotalCartAmount();
  console.log("Total Amount:", totalAmount);
  console.log("Cart Items:", cartItems);
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axiosClient.get("/products");
        setProducts(res.data.products.data); // Ensure this matches the actual path to your data
        console.log("Fetched products:", res.data.products.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const handlePlaceOrder = () => {
    // Construct product_ids array based on cartItems
    const product_ids = Object.entries(cartItems).flatMap(
      ([productId, quantity]) => Array(quantity).fill(Number(productId))
    );

    const orderData = {
      product_ids,
      note: "",
    };

    console.log(orderData);

    try {
      axiosClient.post("/orders", orderData).then(response => {
        console.log(response.data)
        if (!response.data.success) {
          return alert("Failed to place the order. Please try again.");
        }
        console.log("Order placed successfully:", response.data);
        alert("Order placed successfully!");
        window.location.reload();
      }).catch(err => {
        console.log(err);
        return alert("Failed to place the order. Please try again.");
      });
      
      // navigate('/order-confirmation');
    } catch (error) {
      console.error("Error placing order:", error);
      alert("Failed to place the order. Please try again.");
    }
  };

  const cartProductsWithQty = products.filter(
    (product) => cartItems[product.id] > 0
  );

  return (
    <div>
      {totalAmount > 0 ? (
        <div className="cart">
          <div>
            <h1>Your Cart Items</h1>
          </div>
          <div className="cartItems">
            {cartProductsWithQty.map((product) => (
              <CartItem key={product.id} data={product} />
            ))}
          </div>
          <div className="checkout">
            <p>Subtotal: ${totalAmount}</p>
            <div>
              <button onClick={() => navigate("/")}>Continue Shopping</button>
              <button
                onClick={() => {
                  handlePlaceOrder();
                }}
              >
                Place Order
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="no-cart">
          <p>Your Cart is Empty</p>
        </div>
      )}
    </div>
  );
};

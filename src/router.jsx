import { Navigate, createBrowserRouter } from "react-router-dom";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import GuestLayout from "./components/GuestLayout";
import LayoutApp from "./layout/LayoutApp";
import { Shop } from "./pages/shop/shop";
import { Cart } from "./pages/cart/cart";
import Checkout from "./pages/cart/Checkout";

// Function to check if a user is authenticated based on the presence of the ACCESS_TOKEN in localStorage
const isAuthenticated = () => {
    const token = localStorage.getItem("ACCESS_TOKEN");
    return !!token; // Converts the token to a boolean: true if exists, false otherwise
};

const router = createBrowserRouter([
    {
        path: '/',
        element: isAuthenticated() ? <LayoutApp /> : <Navigate to="/login" replace />,
        children: [
            { path: '/', element: <Shop /> },
            { path: '/cart', element: <Cart /> },
            { path: '/checkout', element: <Checkout /> },
        ]
    },
    {
        path: '/',
        element: <GuestLayout />,
        children: [
            {
                path: '/login',
                element: isAuthenticated() ? <Navigate to="/" replace /> : <Login />
            },
            {
                path: '/signup',
                element: isAuthenticated() ? <Navigate to="/" replace /> : <Signup />
            },
        ]
    }
]);

export default router;

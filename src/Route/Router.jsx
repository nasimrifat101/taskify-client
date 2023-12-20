import { createBrowserRouter } from "react-router-dom";
import Main from "../Pages/Layout/Main/Main";
import Home from "../Pages/components/Home/Home";
import NotFound from "../Pages/components/Error/NotFound";
import Login from "../Pages/components/Auth/Login";
import Signup from "../Pages/components/Auth/SignUp";
import Dashboard from "../Pages/Layout/Dash/Dashboard";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Main />,
        errorElement: <NotFound />,
        children: [
            {
                path: '/',
                element: <Home />
            },
            {
                path: '/login',
                element: <Login />
            },
            {
                path: '/signup',
                element: <Signup />
            },
            {
                path: '/dashboard',
                element: <Dashboard />
            }
        ]
    },
]);
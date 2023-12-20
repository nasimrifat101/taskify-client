import { createBrowserRouter } from "react-router-dom";
import Main from "../Pages/Layout/Main/Main";
import Home from "../Pages/components/Home/Home";
import NotFound from "../Pages/components/Error/NotFound";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Main />,
        errorElement:<NotFound/>,
        children: [
            {
                path: '/',
                element: <Home />
            }
        ]
    },
]);
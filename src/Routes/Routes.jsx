
import {
    createBrowserRouter,
} from "react-router-dom";
import Main from "../Layout/Main";
import Register from "../components/register/Register";
import Login from "../components/login/Login";
import Home from "../Home/Home";
import Dashboard from "../Layout/Dashboard";
// import Main from "../Layout/Main";
// import Main from "../Layout/Main";
// import Home from "../Pages/Home/Home";
// import Register from "../components/register/Register"
// import Login from "../components/login/Login";
// import Dashboard from "../Layout/Dashboard";

export const router = createBrowserRouter([
    {
        path: "/",
        element:<Main></Main>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/register',
                element: <Register></Register>
            },
            {
                path: '/login',
                element: <Login></Login>
            }
        ]
    },
    {
        path: 'dashboard',
        element:<Dashboard/>,
        children:[
            {
                
            }
        ]
    }
]);
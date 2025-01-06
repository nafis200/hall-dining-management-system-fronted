
import {
    createBrowserRouter,
} from "react-router-dom";
import Main from "../Layout/Main";
import Register from "../components/register/Register";
import Login from "../components/login/Login";
import Home from "../Home/Home";
import Dashboard from "../Layout/Dashboard";
import FoodMeatList from "../Pages/Dashboard/Manager/FoodMeatList";
import SeeFoodList from "../Pages/Dashboard/Manager/SeeFoodList";
import SeeStudentList from "../Pages/Dashboard/Students/SeeStudentList";
import Paymentsuccess from "../Pages/Dashboard/payment/Paymentsuccess";
import Paymentfailure from "../Pages/Dashboard/payment/Paymentfailure";
import Seepayment from "../Pages/Dashboard/Students/Seepayment";



export const router = createBrowserRouter([
    {
        path: "/",
        element: <Main></Main>,
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
            },
            {
                path: '/success',
                element: <Paymentsuccess />
            },
            {
                path: '/failure',
                element: <Paymentfailure />
            },
            
        ]
    },
    {
        path: 'dashboard',
        element: <Dashboard />,
        children: [
            {
                path: "managefood",
                element: <FoodMeatList />
            },
            {
                path: "Allfoodlist",
                element: <SeeFoodList />
            },
            {
                path: "StudentList",
                element: <SeeStudentList />
            },
            {
                path:'Studentpayment',
                element:<Seepayment/>
            }

        ]
    }
]);
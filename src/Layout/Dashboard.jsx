

import { FaHome, FaHouseUser, FaUsers } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import React, { useContext, useEffect, useState } from 'react';
import { NavLink, Navigate, Outlet } from "react-router-dom";
import useAxiosPublic from '../hooks/useAxiosPublic'
import { AuthContext } from '../providers/AuthProvider';
import { useQuery } from "@tanstack/react-query";
import { MdPayments } from "react-icons/md";
import NavBar from "../Pages/Shared/Navbar/Navbar";
const Dashboard = () => {
    // const axiosPublic = useAxiosPublic()
    // const { user } = useContext(AuthContext)

    const { user } = useContext(AuthContext); // Get the logged-in user
    const axiosPublic = useAxiosPublic(); // Axios instance for making API requests

    // const [isAdmin, setIsAdmin] = useState(false);
    let [isAdmin, setIsAdmin] = useState(false);

    // Fetch all users from the database
    const { data: users = [], refetch: refetchUsers } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosPublic.get('/users'); // Fetch all users
            return res.data;
        }
    });

    useEffect(() => {
        if (users.length > 0 && user) {
            // Find the logged-in user's data in the users array
            const foundUser = users.find(u => u.email === user.email);  

            // Check if the user's role is "admin"
            if (foundUser?.role === 'manager') {
                setIsAdmin(true);
            } else {
                setIsAdmin(false);
            }
        }
    }, [users, user]);

    // isAdmin = "true";
    console.log("Is Admin:", isAdmin);

    return (
        <div>
            <div><NavBar></NavBar></div>

            <div className="flex">
                {/* side bar */}


                <div className="w-64 min-h-screen bg-green-700 text-white">
                    <div className='mt-20'>
                        <ul className="menu p-4">
                            {

                                isAdmin ?
                                    <>
                                        <li><NavLink to='/dashboard/managefood'> <FaUsers></FaUsers> FoodMeat List</NavLink> </li>
                                        <li><NavLink to='/dashboard/Allfoodlist'> <FaUsers></FaUsers> All Food list</NavLink> </li>
                                    </>
                                    :
                                    <>
                                        <li> <NavLink to='/dashboard/StudentList'> <FaUser/>  Food booking </NavLink> </li>
                                        <li> <NavLink to='/dashboard/Studentpayment'><FaUser></FaUser> Payment History </NavLink> </li>
                                    </>


                            }
                        </ul>
                    </div>

                </div>
                {/* dashboard content */}
                <div className="flex-1 p-8">
                    <Outlet></Outlet>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;

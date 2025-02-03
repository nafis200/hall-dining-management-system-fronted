import { FaUsers, FaUser } from "react-icons/fa";
import React, { useContext, useEffect, useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import useAxiosPublic from "../hooks/useAxiosPublic";
import { AuthContext } from "../providers/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import NavBar from "../Pages/Shared/Navbar/Navbar";

const Dashboard = () => {
    const { user } = useContext(AuthContext); // Get the logged-in user
    const axiosPublic = useAxiosPublic(); // Axios instance for making API requests
    const [userRole, setUserRole] = useState("user");

    // Fetch all users from the database
    const { data: users = [] } = useQuery({
        queryKey: ["users"],
        queryFn: async () => {
            const res = await axiosPublic.get("/users");
            return res.data;
        },
    });

    useEffect(() => {
        if (users.length > 0 && user) {
            // Find the logged-in user's data in the users array
            const foundUser = users.find((u) => u.email === user.email);
            // Set user role if found
            setUserRole(foundUser?.role || "user");
        }
    }, [users, user]);

    return (
        <div>
            <NavBar />
            <div className="flex">
                {/* Sidebar */}
                <div className="w-64 min-h-screen bg-purple-700 text-white mt-20">
                    <ul className="menu p-4">
                        {userRole === "manager" && (
                            <>
                                <li><NavLink to="/dashboard/managefood"><FaUsers /> FoodMeat List</NavLink></li>
                                <li><NavLink to="/dashboard/Allfoodlist"><FaUsers /> All Food list</NavLink></li>
                                <li><NavLink to="/dashboard/admin-payment"><FaUsers /> Payment history</NavLink></li>
                                <li><NavLink to="/dashboard/compalin-manager"><FaUsers /> Complain List</NavLink></li>
                                <li><NavLink to="/dashboard/notice-manager"><FaUsers /> Notice</NavLink></li>
                            </>
                        )}
                        {userRole === "user" && (
                            <>
                                <li><NavLink to="/dashboard/StudentList"><FaUser /> Food Booking</NavLink></li>
                                <li><NavLink to="/dashboard/Studentpayment"><FaUser /> Payment History</NavLink></li>
                                <li><NavLink to="/dashboard/compalin-student"><FaUser /> Complaint Box</NavLink></li>
                                <li><NavLink to="/dashboard/notice-board"><FaUser /> Notice Board</NavLink></li>
                            </>
                        )}
                        {userRole === "admin" && (
                            <>
                                
                                <li><NavLink to="/dashboard/Allfoodlist"><FaUsers /> All Food list</NavLink></li>
                                <li><NavLink to="/dashboard/admin-alluser"><FaUsers />See All user</NavLink></li>
                                <li><NavLink to="/dashboard/admin-payment"><FaUsers /> Payment history</NavLink></li>
                                <li><NavLink to="/dashboard/compalin-manager"><FaUsers /> Complain List</NavLink></li>
                                <li><NavLink to="/dashboard/notice-manager"><FaUsers /> Notice</NavLink></li>
                            </>
                        )}
                    </ul>
                </div>
                {/* Dashboard content */}
                <div className="flex-1 p-8 mt-20">
                    <Outlet />
                    <h1 className="mt-10 font-bold">Welcome, {user?.email}</h1>
                    <h1 className="font-bold">Welcome, {user?.displayName}</h1>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
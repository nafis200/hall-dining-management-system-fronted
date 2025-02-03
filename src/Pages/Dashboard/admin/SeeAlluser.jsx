import React, { useEffect, useState } from "react";
import useAxiosPublic from "../../../hooks/useAxiosPublic";

const SeeAlluser = () => {
    const axiosPublic = useAxiosPublic();
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axiosPublic.get(`/users`);
                if (response.data.length > 0) {
                    setUsers(response.data);
                } else {
                    setError("No data found for the user.");
                }
            } catch (err) {
                setError("Failed to fetch users.");
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, [axiosPublic]);

    const handleMakeManager = async (userId) => {
        try {
            const response = await axiosPublic.patch(`/users/${userId}`);
            console.log(response)
            if (response.status === 200) {
                alert("User promoted to Manager successfully!");
                window.location.reload();
            }
        } catch (error) {
            alert("Failed to update user role.");
        }
    };
    const handlCancelManager = async (userId) => {
        try {
            const response = await axiosPublic.patch(`/user/${userId}`);
            console.log(response)
            if (response.status === 200) {
                alert("The role is cancel!");
                window.location.reload();
            }
        } catch (error) {
            alert("Failed to update user role.");
        }
    };

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">User Management</h2>
            {loading && <p>Loading...</p>}
            {error && <p className="text-red-500">{error}</p>}
            {!loading && !error && (
                <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg">
                    <thead>
                        <tr className="bg-purple-700 text-white">
                            <th className="p-3 text-left">Name</th>
                            <th className="p-3 text-left">Email</th>
                            <th className="p-3 text-left">Role</th>
                            <th className="p-3 text-left">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user._id} className="border-b hover:bg-gray-100">
                                <td className="p-3">{user.name}</td>
                                <td className="p-3">{user.email}</td>
                                <td className="p-3">{user.role}</td>
                                <td className="p-3">
                                    {user.role === "user" && (
                                        <button
                                            className="bg-blue-500 text-white px-3 py-1 rounded"
                                            onClick={() => handleMakeManager(user._id)}
                                        >
                                            Make Manager
                                        </button>
                                    )}
                                    {user.role === "manager" && (
                                        <button
                                            className="bg-red-500 text-white px-3 py-1 rounded"
                                            onClick={() => handlCancelManager(user._id)}
                                        >
                                            Cancel Manager
                                        </button>
                                    )}
                                    {user.role === "admin" && (
                                        <button className="bg-green-500 text-white px-3 py-1 rounded" disabled>
                                            Admin
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default SeeAlluser;

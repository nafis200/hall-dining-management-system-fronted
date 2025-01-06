import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Helmet } from "react-helmet-async";
import { updateProfile } from "firebase/auth";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from "sweetalert2";
import { AuthContext } from "../../providers/AuthProvider";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const Register = () => {
    const { createUser } = useContext(AuthContext);
    const [registerError, setRegisterError] = useState('');
    const [success, setSuccess] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const axiosPublic = useAxiosPublic();

    const handleRegister = async (e) => {
        e.preventDefault();

        // Extract form data
        const form = e.target;
        const name = form.name.value;
        const photo = form.photo.value;
        const email = form.email.value;
        const password = form.password.value;
        const role = form.role.value;

        // Reset error and success messages
        setRegisterError('');
        setSuccess('');

        // Validate password strength
        if (password.length < 6) {
            setRegisterError('Password should be at least 6 characters or longer');
            return;
        } else if (!/[A-Z]/.test(password)) {
            setRegisterError('Your password should have at least one uppercase character.');
            return;
        } else if (!/[a-z]/.test(password)) {
            setRegisterError('Your password should have at least one lowercase character.');
            return;
        } else if (!/[!@#$%^&*()_+=[\]{};':"\\|,.<>/?]+/.test(password)) {
            setRegisterError('Your password should have at least one special character.');
            return;
        }

        try {
            // Create user with email and password
            const result = await createUser(email, password);
            const loggedUser = result.user;

            // Update user profile
            await updateProfile(loggedUser, {
                displayName: name,
                photoURL: photo
            });

            // Save user info to the database
            const userInfo = { name, email, role };
            const res = await axiosPublic.post('/users', userInfo);

            if (res.data.insertedId) {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "User created successfully",
                    showConfirmButton: false,
                    timer: 1500
                });
                setSuccess('User Created Successfully.');
                toast.success('User Created Successfully.');
                navigate('/');
            }
        } catch (error) {
            console.error(error);
            setRegisterError(error.message);
        }
    };

    return (
        <div className="relative min-h-screen flex items-center justify-center bg-gray-100">
            {/* Helmet for setting page title */}
            <Helmet>
                <title>Register</title>
            </Helmet>

            {/* Background overlay */}
            <div className="absolute inset-0 bg-black opacity-50"></div>

            {/* Registration form */}
            <div className="relative z-10 w-full max-w-md p-6 bg-white shadow-md rounded-lg">
                <h1 className="text-3xl font-bold text-center text-orange-500 mb-6">Register Now!</h1>

                <form onSubmit={handleRegister}>
                    {/* Name input */}
                    <div className="form-control w-full mb-4">
                        <label className="label">
                            <span className="label-text">Name</span>
                        </label>
                        <input type="text" name="name" placeholder="Enter your name" className="input input-bordered w-full" required />
                    </div>

                    {/* Email input */}
                    <div className="form-control w-full mb-4">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input type="email" name="email" placeholder="Enter your email" className="input input-bordered w-full" required />
                    </div>

                    {/* Photo URL input */}
                    <div className="form-control w-full mb-4">
                        <label className="label">
                            <span className="label-text">Photo URL</span>
                        </label>
                        <input type="text" name="photo" placeholder="Enter photo URL" className="input input-bordered w-full" required />
                    </div>

                    {/* Role selection */}
                    <div className="form-control w-full mb-4">
                        <label className="label">
                            <span className="label-text">Role</span>
                        </label>
                        <select name="role" className="select select-bordered w-full" required>
                            <option value="">Select Role</option>
                            <option value="manager">Manager</option>
                            <option value="user">User</option>
                        </select>
                    </div>

                    {/* Password input */}
                    <div className="form-control w-full mb-6">
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                placeholder="Enter your password"
                                className="input input-bordered w-full"
                                required
                            />
                            <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                                <span onClick={() => setShowPassword(!showPassword)} className="cursor-pointer">
                                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Submit button */}
                    <button type="submit" className="btn w-full bg-orange-400 hover:bg-orange-500 text-white">
                        Register
                    </button>
                </form>

                {/* Error message */}
                {registerError && (
                    <p className="text-red-500 text-center mt-4">{registerError}</p>
                )}

                {/* Success message */}
                {success && (
                    <p className="text-green-500 text-center mt-4">{success}</p>
                )}

                {/* Navigation links */}
                <div className="mt-4 text-center">
                    <p>
                        Already have an account? <Link to="/login" className="text-orange-600 font-bold">Login</Link>
                    </p>
                </div>

                <div className="mt-2 text-center">
                    <p>
                        Go back to <Link to="/" className="text-orange-500 font-bold">Home</Link>
                    </p>
                </div>
            </div>

            {/* Toast notifications */}
            <ToastContainer />
        </div>
    );
};

export default Register;

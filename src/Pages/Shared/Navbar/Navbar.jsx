import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import { AuthContext } from '../../../providers/AuthProvider';

const NavBar = () => {
    const { user, logOut } = useContext(AuthContext);
    const handleLogOut = () => {
        logOut()
            .then(() => {
                toast.success('User logged out Successfully.')
            })
            .catch(error => console.log(error))
    }

    const navOptions = <>
        <li className='hover:text-yellow-300 hover:font-bold hover:text-[15px]'><Link to="/">Home</Link></li>
        <li className='hover:text-yellow-300 hover:font-bold hover:text-[15px]'><Link to="/dashboard">Dashboard</Link></li>
    </>

    return (
        <>
            {/* <div className="navbar fixed z-10 bg-opacity-25 max-w-screen-xl bg-black text-white mb-10"> */}
            <div className="navbar fixed z-10 bg-opacity-25 max-w-screen-xl bg-black text-white mb-10">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </div>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-opacity-45 bg-black rounded-box w-52">
                            {navOptions}
                        </ul>
                    </div>
                    <a className="text-xl flex gap-1">
                        {/* <img src={dropletLogo} className='w-2 md:w-6' alt="dropletlogo" /> */}
                        <span className='text-sm md:text-xl text-primary'>Hall dining Management System</span>
                    </a>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        {navOptions}
                    </ul>
                </div>
                <div className="navbar-end">
                    {
                        user ? (
                            <>
                                <div className="flex flex-col md:flex-row items-center gap-2">
                                    <p className="text-sm md:text-base text-white">{user.displayName}</p>
                                    <div className="tooltip tooltip-bottom" data-tip={user.displayName}>
                                        <img className="w-10 h-10 md:w-14 md:h-14 border-2 border-violet-600 rounded-full" src={user.photoURL} alt="User Profile" />
                                    </div>
                                </div>
                                <button onClick={handleLogOut} className="btn btn-info bg-violet-700 md:h-14 btn-sm md:w-28">
                                    Log out
                                </button>
                            </>
                        ) : (
                            <div className="flex gap-2">
                                <Link to="/login">
                                    <button className="btn btn-info btn-sm md:h-14 md:w-28 ">Log in</button>
                                </Link>
                                <Link to="/register">
                                    <button className="btn bg-violet-600 md:h-14 text-white btn-sm md:w-28">Register</button>
                                </Link>
                            </div>
                        )
                    }
                </div>
                <ToastContainer />
            </div>
        </>
    );
};

export default NavBar;
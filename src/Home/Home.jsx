import React from 'react';
import { Clock, Users, Utensils, Calendar } from 'lucide-react';

const Home = () => {
    return (
        <div className="min-h-screen bg-base-100 flex flex-col">
            
            {/* Upper Section */}
            <div className="hero min-h-[calc(100vh-4rem)] bg-[url('https://i.postimg.cc/HLpfYC5h/pexels-pixabay-262978.jpg')]">
            {/* <div className="hero min-h-[calc(100vh-4rem)] bg-base-200"> */}
                <div className="hero-content text-center">
                    <div className="max-w-2xl">
                        <h1 className="text-5xl font-bold mb-6 text-primary">
                            Streamline Your Dining Experience
                        </h1>
                        <p className="text-xl mb-8 text-white">
                            Effortlessly manage meals, track nutrition, and enjoy hassle-free dining 
                            in your hall with our comprehensive management system.
                        </p>
                        <div className="flex justify-center gap-4">
                            <button className="btn btn-primary">Get Started</button>
                            <button className="btn btn-outline btn-primary">Learn More</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Features Section */}
            <div className="bg-base-100 py-16 px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-primary mb-4">
                        Our Key Features
                    </h2>
                    <p className="text-xl text-base-content/70">
                        Simplifying dining management for students and administrators
                    </p>
                </div>

                <div className="grid md:grid-cols-4 gap-8 max-w-6xl mx-auto">
                    {/* Feature Cards */}
                    <div className="card bg-base-200 shadow-xl">
                        <div className="card-body items-center text-center">
                            <Utensils className="text-primary w-12 h-12 mb-4" />
                            <h3 className="card-title">Meal Planning</h3>
                            <p>Customize and schedule your meals in advance</p>
                        </div>
                    </div>

                    <div className="card bg-base-200 shadow-xl">
                        <div className="card-body items-center text-center">
                            <Clock className="text-primary w-12 h-12 mb-4" />
                            <h3 className="card-title">Real-time Tracking</h3>
                            <p>Monitor your meal credits and consumption</p>
                        </div>
                    </div>

                    <div className="card bg-base-200 shadow-xl">
                        <div className="card-body items-center text-center">
                            <Calendar className="text-primary w-12 h-12 mb-4" />
                            <h3 className="card-title">Menu Management</h3>
                            <p>View daily and weekly meal menus</p>
                        </div>
                    </div>

                    <div className="card bg-base-200 shadow-xl">
                        <div className="card-body items-center text-center">
                            <Users className="text-primary w-12 h-12 mb-4" />
                            <h3 className="card-title">User Management</h3>
                            <p>Easy registration and profile management</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer className="footer p-10 bg-base-200 text-base-content">
                <div>
                    <span className="footer-title">Services</span> 
                    <a className="link link-hover">Meal Booking</a>
                    <a className="link link-hover">Nutrition Tracking</a>
                    <a className="link link-hover">Menu Planning</a>
                </div> 
                <div>
                    <span className="footer-title">Company</span> 
                    <a className="link link-hover">About us</a>
                    <a className="link link-hover">Contact</a>
                    <a className="link link-hover">Support</a>
                </div> 
                <div>
                    <span className="footer-title">Legal</span> 
                    <a className="link link-hover">Terms of use</a>
                    <a className="link link-hover">Privacy policy</a>
                    <a className="link link-hover">Cookie policy</a>
                </div>
            </footer>
        </div>
    );
};

export default Home;
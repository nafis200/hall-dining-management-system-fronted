import React, { useState } from 'react';
import { Clock, Users, Utensils, Calendar, CheckCircle, Shield, ChefHat, MessageCircle } from 'lucide-react';

const Home = () => {
    const [activeTestimonial, setActiveTestimonial] = useState(0);
    
    const testimonials = [
        {
            quote: "The Hall Dining Management System has completely transformed how we manage our dining hall. It's intuitive, efficient, and saves us countless hours of manual work.",
            name: "John Doe",
            role: "Hall Administrator"
        },
        {
            quote: "As a student, I love being able to plan my meals in advance and track my nutrition. It's like having a personal nutritionist and meal planner!",
            name: "Emily Smith",
            role: "Student"
        },
        {
            quote: "The real-time tracking and menu management features are game-changers. No more waiting in long lines or wondering what's for lunch.",
            name: "Michael Brown",
            role: "Dining Hall Staff"
        }
    ];

    return (
        <div className="min-h-screen bg-base-100 flex flex-col">
            {/* Hero Section with Background Image */}
            <div className="hero min-h-[calc(100vh-4rem)] bg-[url('https://i.postimg.cc/HLpfYC5h/pexels-pixabay-262978.jpg')] bg-cover bg-center relative">
                <div className="absolute inset-0 bg-black opacity-50"></div>
                <div className="hero-content text-center relative z-10">
                    <div className="max-w-2xl">
                        <h1 className="text-5xl font-bold mb-6 text-white">
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

            {/* Key Features Section */}
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
                    {[
                        { icon: Utensils, title: "Meal Planning", description: "Customize and schedule your meals in advance" },
                        { icon: Clock, title: "Real-time Tracking", description: "Monitor your meal credits and consumption" },
                        { icon: Calendar, title: "Menu Management", description: "View daily and weekly meal menus" },
                        { icon: Users, title: "User Management", description: "Easy registration and profile management" }
                    ].map((feature, index) => (
                        <div key={index} className="card bg-base-200 shadow-xl hover:scale-105 transition-transform">
                            <div className="card-body items-center text-center">
                                <feature.icon className="text-primary w-12 h-12 mb-4" />
                                <h3 className="card-title">{feature.title}</h3>
                                <p>{feature.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Additional Value Proposition Section */}
            <div className="bg-base-200 py-16 px-4">
                <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="text-3xl font-bold text-primary mb-6">
                            Why Choose Our Dining Management System?
                        </h2>
                        <div className="space-y-4">
                            {[
                                { icon: CheckCircle, text: "Complete meal customization and pre-booking" },
                                { icon: Shield, text: "Secure and transparent nutrition tracking" },
                                { icon: ChefHat, text: "Diverse menu options catering to various dietary needs" }
                            ].map((item, index) => (
                                <div key={index} className="flex items-center space-x-4">
                                    <item.icon className="text-primary w-8 h-8" />
                                    <p className="text-lg">{item.text}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="bg-base-100 p-8 rounded-xl shadow-lg">
                        <h3 className="text-2xl font-semibold mb-6 text-primary text-center">
                            Quick Benefits Overview
                        </h3>
                        <ul className="space-y-3">
                            <li className="flex items-center">
                                <CheckCircle className="mr-3 text-success" />
                                Reduce food waste
                            </li>
                            <li className="flex items-center">
                                <CheckCircle className="mr-3 text-success" />
                                Improve dietary management
                            </li>
                            <li className="flex items-center">
                                <CheckCircle className="mr-3 text-success" />
                                Save time for students and staff
                            </li>
                            <li className="flex items-center">
                                <CheckCircle className="mr-3 text-success" />
                                Enhance dining hall efficiency
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Testimonials Section */}
            <div className="bg-base-100 py-16 px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-primary mb-4">
                        What Our Users Say
                    </h2>
                    <p className="text-xl text-base-content/70">
                        Real experiences from students, administrators, and staff
                    </p>
                </div>

                <div className="max-w-2xl mx-auto text-center">
                    <div className="bg-base-200 p-8 rounded-xl shadow-lg">
                        <MessageCircle className="mx-auto text-primary w-16 h-16 mb-6" />
                        <p className="text-xl mb-6 italic">"{testimonials[activeTestimonial].quote}"</p>
                        <div>
                            <p className="font-bold text-lg">{testimonials[activeTestimonial].name}</p>
                            <p className="text-base-content/70">{testimonials[activeTestimonial].role}</p>
                        </div>
                    </div>
                    <div className="flex justify-center mt-6 space-x-4">
                        {testimonials.map((_, index) => (
                            <button
                                key={index}
                                className={`w-3 h-3 rounded-full ${
                                    index === activeTestimonial 
                                        ? 'bg-primary' 
                                        : 'bg-base-300'
                                }`}
                                onClick={() => setActiveTestimonial(index)}
                            />
                        ))}
                    </div>
                </div>
            </div>

            {/* Footer */}
            {/* <footer className="footer p-10 bg-base-200 text-base-content">
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
            </footer> */}
        </div>
    );
};

export default Home;
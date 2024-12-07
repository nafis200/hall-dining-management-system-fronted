import React from 'react';
import { Clock, Users, Utensils, Calendar, Star, Smile } from 'lucide-react';

const Home = () => {
    return (
        <div className="min-h-screen bg-base-100 flex flex-col">
            {/* Hero Section */}
            <div className="hero min-h-[calc(100vh-4rem)] bg-[url('https://i.postimg.cc/HLpfYC5h/pexels-pixabay-262978.jpg')] bg-cover">
                <div className="hero-overlay bg-opacity-50"></div>
                <div className="hero-content text-center text-white">
                    <div className="max-w-2xl">
                        <h1 className="text-5xl font-bold mb-6 text-primary">
                            Streamline Your Dining Experience
                        </h1>
                        <p className="text-xl mb-8">
                            Effortlessly manage meals, track nutrition, and enjoy hassle-free dining in your hall with our comprehensive management system.
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
                    <FeatureCard
                        icon={<Utensils className="text-primary w-12 h-12 mb-4" />}
                        title="Meal Planning"
                        description="Customize and schedule your meals in advance"
                    />
                    <FeatureCard
                        icon={<Clock className="text-primary w-12 h-12 mb-4" />}
                        title="Real-time Tracking"
                        description="Monitor your meal credits and consumption"
                    />
                    <FeatureCard
                        icon={<Calendar className="text-primary w-12 h-12 mb-4" />}
                        title="Menu Management"
                        description="View daily and weekly meal menus"
                    />
                    <FeatureCard
                        icon={<Users className="text-primary w-12 h-12 mb-4" />}
                        title="User Management"
                        description="Easy registration and profile management"
                    />
                </div>
            </div>

            {/* Statistics Section */}
            <div className="bg-primary py-12 text-white">
                <div className="max-w-6xl mx-auto grid md:grid-cols-4 text-center gap-8">
                    <StatCard value="5K+" label="Students Served" />
                    <StatCard value="1.2M" label="Meals Scheduled" />
                    <StatCard value="95%" label="Satisfaction Rate" />
                    <StatCard value="50+" label="Staff Members" />
                </div>
            </div>

            {/* Testimonials Section */}
            <div className="py-16 bg-base-200">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-primary mb-4">What Students Say</h2>
                    <p className="text-xl text-base-content/70">
                        Hear from our happy users
                    </p>
                </div>
                <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
                    <Testimonial
                        icon={<Smile className="text-primary w-12 h-12" />}
                        feedback="This platform has made managing meals so easy! I love the real-time updates and menu options."
                        name="John Doe"
                        role="Student"
                    />
                    <Testimonial
                        icon={<Star className="text-primary w-12 h-12" />}
                        feedback="The inventory tracking feature is a lifesaver for our team. Highly recommend!"
                        name="Jane Smith"
                        role="Hall Manager"
                    />
                </div>
            </div>

            {/* Footer */}
            {/* <footer className="footer p-10 bg-base-300 text-base-content">
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

// Feature Card Component
const FeatureCard = ({ icon, title, description }) => (
    <div className="card bg-base-200 shadow-xl">
        <div className="card-body items-center text-center">
            {icon}
            <h3 className="card-title">{title}</h3>
            <p>{description}</p>
        </div>
    </div>
);

// Statistic Card Component
const StatCard = ({ value, label }) => (
    <div>
        <h3 className="text-4xl font-bold">{value}</h3>
        <p>{label}</p>
    </div>
);

// Testimonial Card Component
const Testimonial = ({ icon, feedback, name, role }) => (
    <div className="bg-white shadow-md p-6 rounded-lg text-center">
        {icon}
        <p className="mt-4 text-base-content/70">{feedback}</p>
        <h4 className="mt-2 font-bold">{name}</h4>
        <p className="text-sm text-base-content/50">{role}</p>
    </div>
);

export default Home;

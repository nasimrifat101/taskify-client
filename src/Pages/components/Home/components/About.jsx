/* eslint-disable react/no-unescaped-entities */
import Navbar from "./Navbar";

const About = () => {
    return (
        <>
            <Navbar />
            <div className="min-h-screen flex items-center justify-center">
                <div className="max-w-2xl text-center">
                    <h1 className="text-4xl font-bold mb-4">About Us</h1>
                    <p className="text-lg mb-8">
                        Hello there! We're on a mission to build apps that bring joy and happiness to people's lives. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                        <div className="p-6 bg-opacity-75 rounded-lg">
                            <h2 className="text-xl font-semibold mb-4">Our Mission</h2>
                            <p>
                                our mission is to build apps that make people happy, providing solutions that enhance their lives and bring a smile to their faces.
                            </p>
                        </div>
                        <div className="p-6 bg-opacity-75 rounded-lg">
                            <h2 className="text-xl font-semibold mb-4">Our Vision</h2>
                            <p>
                                our vision is to evolve into a software company, creating impactful solutions that shape the future of technology.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default About;

import { NavLink } from "react-router-dom";

const Banner = () => {
    return (
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 min-h-screen gap-10">

            <div className="my-auto space-y-5">
                <h1 className="text-6xl text-center lg:text-left lg:text-9xl font-black hover:text-green-400 ease-in-out duration-700">Taskify</h1>
                <h1 className="lg:text-lg text-center lg:text-left leading-snug">Managing task with ease like never before. With our simple but effective cutting edge technology to make your life simple and efficient. </h1>
                <div className="flex justify-center lg:justify-start">
                    <NavLink to='/login' className="btn hover:bg-green-400 hover:text-base-300 ease-in-out duration-700">Explore Now</NavLink>
                </div>
            </div>
            <div className="my-auto hidden lg:block">
                <img src="https://i.postimg.cc/bJ1wRyW1/Group-8-1.png" className="rotate-180" alt="" />
            </div>
        </div>
    );
};

export default Banner;
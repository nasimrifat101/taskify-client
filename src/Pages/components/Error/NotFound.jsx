import { NavLink } from "react-router-dom";

const NotFound = () => {
    return (
        <div>
            <div className="hero min-h-screen">
                <div className="hero-content text-center">
                    <div className="">
                        <h1 className="text-[300px] font-bold">404</h1>
                        <p className="text-center -mt-20">Page not found</p>
                        
                        <NavLink to='/' className="btn btn-outline w-40 mt-5">Home</NavLink>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NotFound;
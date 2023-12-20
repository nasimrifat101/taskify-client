import { NavLink } from "react-router-dom";

const NotFound = () => {
    return (
        <div>
            <div className="hero min-h-screen">
                <div className="hero-content text-center">
                    <div className="">
                        <h1 className="text-9xl font-bold">404</h1>
                        <p className="text-center">Page not found</p>
                        
                        <NavLink to='/' className="btn btn-primary mt-20">Home</NavLink>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NotFound;
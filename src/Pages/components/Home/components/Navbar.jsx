import { Link, NavLink } from "react-router-dom";
import useAuth from "../../../../Hooks/useAuth";

const Navbar = () => {
    const { user, logOut } = useAuth()
    const navLinks = <>
        <li><NavLink to='/'>Home</NavLink></li>
        <li><NavLink to='/about'>About</NavLink></li>
        {
            user && <li><NavLink to='/dashboard'>Dashboard</NavLink></li>
        }

    </>
    return (
        <div>
            <div className="navbar bg-base-100">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </div>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                            {navLinks}
                        </ul>
                    </div>
                    <Link to='/' className="btn btn-ghost text-xl">Taskify</Link>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1 space-x-5">
                        {navLinks}
                    </ul>
                </div>
                <div className="navbar-end">
                    {
                        user ?
                            <div className="dropdown dropdown-end">
                                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                    <div className="w-10 rounded-full">
                                        <img alt={user?.displayName} src={user ? user?.photoURL : "https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"} />
                                    </div>
                                </div>
                                <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-300 rounded-box">
                                    <li><button onClick={logOut}>Logout</button></li>
                                </ul>
                            </div>
                            :

                            <NavLink to='/login' className="btn">Login</NavLink>
                    }
                </div>
            </div>
        </div>
    );
};

export default Navbar;



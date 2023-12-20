/* eslint-disable react/prop-types */

import { FaHome } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const NavDash = ({ title, btn, profile }) => {
    return (
        <div>
            <div className="navbar bg-base-300">
                <div className="navbar-start">

                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full">
                                <img src={profile} />
                            </div>
                        </div>

                    </div>




                    <a className="btn btn-ghost text-xl">{title}</a>
                </div>

                <div className="navbar-end space-x-1">
                    <a className="btn">{btn}</a>
                    <NavLink to='/' className="btn"><FaHome/></NavLink>
                </div>
            </div>
        </div>
    );
};

export default NavDash;
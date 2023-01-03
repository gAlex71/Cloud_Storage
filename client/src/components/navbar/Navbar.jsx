import React from "react";
import "./navbar.css";
import {NavLink} from "react-router-dom";

const Navbar = () => {
    return(
        <div className="navbar">
            <div className="container">
                <div className="navbar_header">Cloud Storage</div>
                <div className="navbar_login">
                    <NavLink to="/login">
                        Login
                    </NavLink>
                </div>
                <div className="navbar_registration">
                    <NavLink to="/registration">
                        Registration
                    </NavLink>
                </div>
            </div>
        </div>
    );
}

export default Navbar
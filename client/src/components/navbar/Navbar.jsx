import React from "react";
import "./navbar.css";
import {NavLink} from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { logout } from "../../reducers/userReducer";

const Navbar = () => {
    const isAuth = useSelector(state => state.user.isAuth)
    const dispatch = useDispatch()

    return(
        <div className="navbar">
            <div className="container">
                <div className="navbar_header">Cloud Storage</div>
                {!isAuth && 
                    <>
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
                    </>
                }
                {isAuth &&
                    <div 
                        className="navbar_login"
                        onClick={() => dispatch(logout())}
                    >
                            Exit
                    </div>
                }
            </div>
        </div>
    );
}

export default Navbar
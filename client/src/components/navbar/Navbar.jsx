import React, { useState } from "react";
import "./navbar.css";
import {NavLink} from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { logout } from "../../reducers/userReducer";
import { searchFile } from "../../actions/file";
import { getFiles } from "../../../../server/controllers/fileController";
import { showLoader } from "../../reducers/appReducer";

const Navbar = () => {
    const isAuth = useSelector(state => state.user.isAuth)
    const currentDir = useSelector(state => state.files.currentDir)
    const dispatch = useDispatch()
    const [searchName, setSearchName] = useState('')
    const [searchTimeOut, setSearchTimeOut] = useState(false)

    const searchChangeHandler = (name) => {
        setSearchName(name)
        if(searchTimeOut != false){
            clearTimeout(searchTimeOut)
        }
        dispatch(showLoader())
        if(name != ''){
            setSearchTimeOut(setTimeout((value) => {
                dispatch(searchFile(value))
            }, 500, name))
        }else{
            dispatch(getFiles(currentDir))
        }
    }

    return(
        <div className="navbar">
            <div className="container">
                <div className="navbar_header">Cloud Storage</div>
                {isAuth &&
                    <input 
                        value={searchName}
                        onChange={(e) => searchChangeHandler(e.target.value)}
                        className="navbar__search" 
                        type="text" 
                        placeholder="Название файла..."
                    />
                }
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
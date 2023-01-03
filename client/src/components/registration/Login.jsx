import React from "react"
import { useState } from "react"
import Input from "../utils/input/Input"
import "./registration.css"
import {useDispatch} from "react-redux"
import { login } from "../../actions/user"

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch()

    const postDates = () => {
        dispatch(login(email, password))
        setEmail('')
        setPassword('')
    }

    return(
        <div>
            <div className="registration">
                <div className="registration_header">Authorization</div>
                <Input value={email} setValue={setEmail} type="text" placeholder="Enter name..."/>
                <Input value={password} setValue={setPassword} type="password" placeholder="Enter password..."/>
                <div className="registration_btn" onClick={postDates}>Login</div>
            </div>
        </div>
    )
}

export default Login
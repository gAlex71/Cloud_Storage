import React from "react"
import { useState } from "react"
import Input from "../utils/input/Input"
import "./registration.css"
import { registration } from "../../actions/user"

const Registration = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const postDates = () => {
        registration(email, password)
        setEmail('')
        setPassword('')
    }

    return(
        <div>
            <div className="registration">
                <div className="registration_header">Registration</div>
                <Input value={email} setValue={setEmail} type="text" placeholder="Enter name..."/>
                <Input value={password} setValue={setPassword} type="password" placeholder="Enter password..."/>
                <div className="registration_btn" onClick={postDates}>Login</div>
            </div>
        </div>
    )
}

export default Registration
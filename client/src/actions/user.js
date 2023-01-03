import axios from "axios";
import { setUser } from "../reducers/userReducer";

export const registration = async(email, password) => {
    try {
        const response = await axios.post('http://localhost:5000/api/auth/registration', {
            email,
            password
        })
        console.log(response.data.message);
    } catch (e) {
        console.log(e);
    }
}

export const login = (email, password) => {
    return async dispatch => {
        try {
            const response = await axios.post('http://localhost:5000/api/auth/login', {
                email,
                password
            })
            //Сохраняем пользователя в глобальное хранилище
            dispatch(setUser(response.data.user))
            //Сохраняем токен 
            localStorage.setItem('token', response.data.token)
        } catch (e) {
            console.log(e);
        }
    }
}

export const auth = () => {
    return async dispatch => {
        try {
            const response = await axios.get('http://localhost:5000/api/auth/auth', {
                headers: {
                    Autorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            //Сохраняем пользователя в глобальное хранилище
            dispatch(setUser(response.data.user))
            //Сохраняем токен 
            localStorage.setItem('token', response.data.token)
        } catch (e) {
            console.log(e);
            localStorage.removeItem('token')
        }
    }
}
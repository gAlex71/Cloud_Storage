import axios from "axios";
import {setFiles} from "../reducers/fileReducer";

export function getFiles(dirId){
    return async dispatch => {
        try {
            const response = axios.get(`http://localhost:5000/api/files${dirId ? '?parent='+dirId : ''}`, {
                headers: {Autorization: `Bearer ${localStorage.getItem('token')}`}
            })
            dispatch(setFiles(response.data))
        } catch (e) {
            console.log(e.response.data.message);
        }
    }
}
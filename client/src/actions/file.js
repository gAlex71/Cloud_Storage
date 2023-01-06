import axios from "axios";
import {setFiles, addFile} from "../reducers/fileReducer";

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

export function createFile(name){
    return async dispatch => {
        try {
            const response = axios.post(`http://localhost:5000/api/files`, {
                name,
                // parent: dirId,
                type: 'dir'
            }, {
                headers: {Autorization: `Bearer ${localStorage.getItem('token')}`}
            })
            dispatch(addFile(response.data))
        } catch (e) {
            console.log(e.response.data.message);
        }
    }
}
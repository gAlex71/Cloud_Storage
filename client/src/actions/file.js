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

export function uploadFile(file, dirId){
    return async dispatch => {
        try {
            const formData = new FormData()
            formData.append('file', file)
            if(dirId){
                formData.append('parent', dirId)
            }
            const response = axios.post(`http://localhost:5000/api/files/upload`, formData, {
                headers: {Autorization: `Bearer ${localStorage.getItem('token')}`},
                //Функция прогресса загрузки
                onUploadProgress: progressEvent => {
                    const totalLength = progressEvent.lengthComputable ? progressEvent.total : progressEvent.target.getResponseHeader('content-length') || progressEvent.target.getResponseHeader('x-decompressed-content-length');
                    console.log('total', totalLength)
                    if (totalLength) {
                        let progress = Math.round((progressEvent.loaded * 100) / totalLength)
                        console.log(progress)
                    }
                }
            })
            dispatch(addFile(response.data))
        } catch (e) {
            console.log(e.response.data.message);
        }
    }
}
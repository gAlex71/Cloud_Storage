import React, {useEffect} from "react";
import "./disk.css";
import {useDispatch, useSelector} from "react-redux";
import { getFiles } from "../../actions/file";
import FileList from "./fileList/FileList";
import Popup from "./Popup";
import { setCurrentDir, setPopupDisplay } from "../../reducers/fileReducer";

const Disk = () => {
    const dispatch = useDispatch()
    const currentDir = useSelector(state => state.files.currentDir)
    const dirStack = useSelector(state => state.files.dirStack)

    useEffect(() => {
        dispatch(getFiles(currentDir))
    }, [currentDir])

    const showPopupHandler = () => {
        // dispatch(createFile('dir name new'))
        dispatch(setPopupDisplay('flex'))
    }

    const backClickHandler = () => {
        //Получаем последний добавленный элемент
        const backDirId = dirStack.pop()
        dispatch(setCurrentDir(backDirId))
    }

    return(
        <div className="disk">
            <div className="disk_btns">
                <button className="disk_back" onClick={() => backClickHandler()}>Back</button>
                <button className="disk_create"  onClick={() => showPopupHandler()}>Create</button>
            </div>
            <FileList/>
            <Popup/>
        </div>
    )
}

export default Disk
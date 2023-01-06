import React, {useEffect} from "react";
import "./disk.css";
import {useDispatch, useSelector} from "react-redux";
import { getFiles } from "../../actions/file";
import FileList from "./fileList/FileList";
import Popup from "./Popup";
import { setPopupDisplay } from "../../reducers/fileReducer";

const Disk = () => {
    const dispatch = useDispatch()
    const currentDir = useSelector(state => state.files.currentDir)

    useEffect(() => {
        dispatch(getFiles(currentDir))
    }, [currentDir])

    const showPopupHandler = () => {
        // dispatch(createFile('dir name new'))
        dispatch(setPopupDisplay('flex'))
    }

    return(
        <div className="disk">
            <div className="disk_btns">
                <button className="disk_back">Back</button>
                <button className="disk_create"  onClick={() => showPopupHandler()}>Create</button>
            </div>
            <FileList/>
            <Popup/>
        </div>
    )
}

export default Disk
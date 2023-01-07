import React from "react";
import "./file.css";
import {useDispatch, useSelector} from "react-redux";
import {setCurrentDir, pushToStack} from "../../../../reducers/fileReducer";
import fileLogo from "../../../../assets/file.svg";
import dirLogo from "../../../../assets/dir.svg";

const File = ({file}) => {
    const dispatch = useDispatch()
    const currentDir = useSelector(state => state.files.currentDir)

    const openDirHandler = () => {
        dispatch(pushToStack(currentDir))
        dispatch(setCurrentDir(file.id))
    }

    return(
        <div className="file" onClick={file.type === 'dir' ? () => openDirHandler() : ''}>
            <img src={file.type === 'dir' ? dirLogo : fileLogo} alt="" className="img"/>
            <div className="name">{file.name}</div>
            <div className="date">{file.date}</div>
            <div className="size">{file.size}</div>
        </div>
    )
}

export default File
import React from "react";
import "./file.css";
import {useDispatch, useSelector} from "react-redux";
import {setCurrentDir, pushToStack} from "../../../../reducers/fileReducer";
import {downloadFile} from "../../../../actions/file";
import fileLogo from "../../../../assets/file.svg";
import dirLogo from "../../../../assets/dir.svg";

const File = ({file}) => {
    const dispatch = useDispatch()
    const currentDir = useSelector(state => state.files.currentDir)

    const openDirHandler = (file) => {
        if(file.type === 'dir'){
            dispatch(pushToStack(currentDir))
            dispatch(setCurrentDir(file.id))
        }
    }

    const downloadClickHandler = (e) => {
        e.stopPropagation()
        downloadFile(file)
    }

    return(
        <div className="file" onClick={() => openDirHandler(file)}>
            <img src={file.type === 'dir' ? dirLogo : fileLogo} alt="" className="img"/>
            <div className="name">{file.name}</div>
            <div className="date">{file.date}</div>
            <div className="size">{file.size}</div>
            {file.type !== 'dir' && <button onClick={(e) => downloadClickHandler(e)} className="file__btn file__download">Download</button>}
            <button className="file__btn file__delete">Delete</button>
        </div>
    )
}

export default File
import React from "react";
import "./file.css";
import {useDispatch, useSelector} from "react-redux";
import {setCurrentDir, pushToStack} from "../../../../reducers/fileReducer";
import {deleteFile, downloadFile} from "../../../../actions/file";
import fileLogo from "../../../../assets/file.svg";
import dirLogo from "../../../../assets/dir.svg";
import sizeFormat from "../../../utils/sizeFormat";

const File = ({file}) => {
    const dispatch = useDispatch()
    const currentDir = useSelector(state => state.files.currentDir)
    const setView = useSelector(state => state.files.view)

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

    const deleteHandler = (e) => {
        e.stopPropagation()
        dispatch(deleteFile(file))
    }

    if(setView === 'list'){
        return(
            <div className="file" onClick={() => openDirHandler(file)}>
                <img src={file.type === 'dir' ? dirLogo : fileLogo} alt="" className="img"/>
                <div className="name">{file.name}</div>
                <div className="date">{file.date}</div>
                <div className="size">{sizeFormat(file.size)}</div>
                {file.type !== 'dir' && <button onClick={(e) => downloadClickHandler(e)} className="file__btn file__download">Download</button>}
                <button onClick={(e) => deleteHandler(e)} className="file__btn file__delete">Delete</button>
            </div>
        )
    }

    if (setView === 'plate') {
        return (
            <div className='file-plate' onClick={() => openDirHandler(file)}>
                <img src={file.type === 'dir' ? dirLogo : fileLogo} alt="" className="file-plate__img"/>
                <div className="file-plate__name">{file.name}</div>
                <div className="file-plate__btns">
                    {file.type !== 'dir' &&
                    <button onClick={(e) => downloadClickHandler(e)} className="file-plate__btn file-plate__download">download</button>}
                    <button onClick={(e) => deleteHandler(e)} className="file-plate__btn file-plate__delete">delete</button>
                </div>
            </div>
        );
    }
}

export default File
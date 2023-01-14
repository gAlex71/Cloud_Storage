import React, {useEffect} from "react";
import "./disk.css";
import {useDispatch, useSelector} from "react-redux";
import { getFiles, uploadFile } from "../../actions/file";
import FileList from "./fileList/FileList";
import Popup from "./Popup";
import { setCurrentDir, setPopupDisplay } from "../../reducers/fileReducer";
import { useState } from "react";
import Uploader from "./uploader/Uploader";

const Disk = () => {
    const dispatch = useDispatch()
    const currentDir = useSelector(state => state.files.currentDir)
    const dirStack = useSelector(state => state.files.dirStack)

    const [dragEnter, setDragEnter] = useState(false)

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

    const fileUploadHandler = (event) => {
        //Получаем все файлы из инпута
        const files = [...event.target.files]
        //Для каждого из файла вызовем функцию загрузки
        files.forEach(file => dispatch(uploadFile(file, currentDir)))
    }

    const dragEnterHandler = (event) => {
        event.preventDefault()
        event.stopPropagation()
        setDragEnter(true)
    }

    const dragLeaveHandler = (event) => {
        event.preventDefault()
        event.stopPropagation()
        setDragEnter(false)
    }

    //Получаем перенесенные в область файлы
    const dropHandler = (event) => {
        event.preventDefault()
        event.stopPropagation()
        let files = [...event.dataTransfer.files]
        console.log(files);
        //Для каждого из файла вызовем функцию загрузки
        files.forEach(file => dispatch(uploadFile(file, currentDir)))
        setDragEnter(false)
    }

    return(
        !dragEnter
            //Вешаем слушатели событий, определяющие занесение файла в область компонента
            ? <div className="disk" onDragEnter={dragEnterHandler} onDragLeave={dragLeaveHandler} onDragOver={dragEnterHandler}>
                <div className="disk_btns">
                    <button className="disk_back" onClick={() => backClickHandler()}>Back</button>
                    <button className="disk_create"  onClick={() => showPopupHandler()}>Create</button>
                    <div className="disk_upload">
                    <label htmlFor="disk_upload-input" className="disk__upload-label">Загрузить файл</label>
                    {/* Multiple - выбор сразу нескольких файлов */}
                    <input multiple={true} onChange={(event) => fileUploadHandler(event)} type="file" id="disk_upload-input" className="disk__upload-input" />
                </div>
              </div>
              <FileList/>
              <Popup/>
              <Uploader/>
            </div>
            : <div className="drop-area" onDrop={dropHandler} onDragEnter={dragEnterHandler} onDragLeave={dragLeaveHandler} onDragOver={dragEnterHandler}>
                Перетащите файлы сюда
              </div>
    )
}

export default Disk
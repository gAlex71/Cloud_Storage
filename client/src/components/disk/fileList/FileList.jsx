import React from "react";
import "./fileList.css";
import {useSelector} from "react-redux";
import File from "./file/File";

const FileList = () => {
    // const files = useSelector(state => state.files.files).map(file => <File/>)
    const files = [
        {id: 1, name: 'first_dir', type: 'dir', size: '5gb', date: '22.12.22'},
        {id: 2, name: 'name_dir', type: 'file', size: '2gb', date: '12.12.22'},
        {id: 3, name: 'my_dir', type: 'dir', size: '10gb', date: '02.12.22'},
    ]

    return(
        <div className="filelist">
            <div className="header">
                <div className="name">Название</div>
                <div className="date">Дата</div>
                <div className="size">Размер</div>
            </div>
            {files.map(file => 
                <File key={file.id} file={file}/>
            )}
        </div>
    )
}

export default FileList
import React from "react";
import "./file.css";
import fileLogo from "../../../../assets/file.svg";
import dirLogo from "../../../../assets/dir.svg";

const File = ({file}) => {
    return(
        <div className="file">
            <img src={file.type === 'dir' ? dirLogo : fileLogo} alt="" className="img"/>
            <div className="name">{file.name}</div>
            <div className="date">{file.date}</div>
            <div className="size">{file.size}</div>
        </div>
    )
}

export default File
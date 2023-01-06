import React, {useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPopupDisplay } from "../../reducers/fileReducer";
import {createFile} from "../../actions/file";
import Input from "../utils/input/Input";
import "./disk.css";

const Popup = () => {
    const [dirName, setDirName] = useState('')
    const popupDisplay = useSelector(state => state.files.popupDisplay)
    const dispatch = useDispatch()

    const createDirHandler = () => {
        dispatch(createFile(dirName))
        setDirName('')
        dispatch(setPopupDisplay('none'))
    }
    
    return(
        <div 
            className="popup" 
            style={{display: popupDisplay}}
            onClick={() => dispatch(setPopupDisplay('none'))}
        >
            <div className="popup__content" onClick={(e) => e.stopPropagation()}>
                <div className="popup__header">
                    <div className="popup__title">Create new file</div>
                    <div 
                        className="popup__close"
                        onClick={() => dispatch(setPopupDisplay('none'))}
                    >
                        X
                    </div>
                </div>
                <Input 
                    type="text" 
                    placeholder="Enter name File..." 
                    value={dirName} 
                    setValue={setDirName}
                />
                <button 
                    className="popup__create"
                    onClick={() => createDirHandler()}
                >
                    Create
                </button>
            </div>
        </div>
    )
}

export default Popup
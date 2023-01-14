import {applyMiddleware, combineReducers, createStore} from "redux"
//Для использования инструментов разработчика в браузере
import {composeWithDevTools} from "redux-devtools-extension"
import thunk from "redux-thunk"
import fileReducer from "./fileReducer"
import uploadReducer from "./uploadReducer"
import userReducer from "./userReducer"

//Корневой компонент, в котором будем совмещать все редюсеры
const rootReducer = combineReducers({
    user: userReducer,
    files: fileReducer,
    upload: uploadReducer
})

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))
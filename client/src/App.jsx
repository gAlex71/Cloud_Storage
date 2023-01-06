import React from 'react';
import Navbar from './components/navbar/Navbar.jsx';
import "./app.css";
import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import Registration from './components/registration/Registration';
import Login from './components/registration/Login.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { auth } from './actions/user.js';
import Disk from './components/disk/Disk.jsx';

const App = () => {
  const isAuth = useSelector(state => state.user.isAuth)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(auth())
  }, [])

  return (
    <BrowserRouter>
      <div className='app'>
        <Navbar/>
        
        <div className="wrap">
          {!isAuth 
            ?
            (<Routes>
              <Route path='/registration' element={<Registration/>}/>
              <Route path='/login' element={<Login/>}/>
              <Route path="*" element={<Navigate to="/login" replace />}/>
            </Routes>)
            :
            (<Routes>
              <Route exact path='/' element={<Disk/>}/>
              <Route path="*" element={<Navigate to="/" replace />}/>
            </Routes>)
          }
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;

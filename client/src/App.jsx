import React from 'react';
import Navbar from './components/navbar/Navbar.jsx';
import "./app.css";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Registration from './components/registration/Registration';

const App = () => {
  return (
    <BrowserRouter>
      <div className='app'>
        <Navbar/>
        
        <div className="wrap">
          <Routes>
            <Route path='/registration' element={<Registration/>}/>
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;

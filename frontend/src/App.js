import React from 'react';
import './App.css';

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import LoginPage from './pages/LoginPage';
import CardPage from './pages/CardPage';
import RegisterPage from './pages/RegisterPage';
import HomePage from './pages/HomePage';
import EnterCodePage from './pages/EnterCodePage';
import isLoggedIn from './logic/isLoggedIn';

function App()
{
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" index element={<HomePage/>}/>
        <Route path="/home" index element={<Navigate to="/"/>}/>
        <Route 
          path="/login" 
          index 
          element={!isLoggedIn()? <LoginPage/> : <Navigate to="/user-home"/>}
        />
        <Route 
          path="/register" 
          index 
          element={!isLoggedIn()? <RegisterPage/>: <Navigate to="/user-home"/>}
        />
        <Route 
          path="/user-home"
          index 
          element={isLoggedIn()? <UserHome/> : <Navigate to="/login"/>}
        />
        <Route
          path="/verify-email" 
          index 
          element={isLoggedIn()? <EnterCodePage/> : <Navigate to="/login"/>}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
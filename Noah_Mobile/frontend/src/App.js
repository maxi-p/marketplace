import React from 'react';
import './App.css';

import { BrowserRouter, Routes, Route } from "react-router-dom";

import LoginPage from './pages/LoginPage';
import CardPage from './pages/CardPage';
import RegisterPage from './pages/RegisterPage';
import TempHomePage from './pages/TempHomePage';

function App()
{
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" index element={<LoginPage/>}/>
        <Route path="/cards" index element={<CardPage/>}/>
        <Route path="/register" index element={<RegisterPage/>}/>
        <Route path="/home" index element={<TempHomePage/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
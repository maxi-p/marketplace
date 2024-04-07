import React, {useState} from 'react';
import './App.css';

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import HomePage from './pages/HomePage';
import UserHomePage from './pages/UserHomePage'
import EnterCodePage from './pages/EnterCodePage';
import isLogged from './logic/isLoggedIn';
import PostDetails from './components/PostDetails';

function App()
{
  // console.log(isLoggedIn()!=null)
  const [isLoggedIn, setIsLoggedIn] = useState(isLogged()!=null);

  const loggedHandler = data => {
    setIsLoggedIn(data)
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route
            index
            element={<HomePage/>}
          />
          <Route
            path=":id"
            element={<PostDetails/>}
          />
        </Route>
        <Route path="/home" index element={<Navigate to="/"/>}/>
        <Route 
          path="/login" 
          index 
          element={!isLoggedIn? <LoginPage loggedHandler={loggedHandler}/> : <Navigate to="/user-home"/>}
        />
        <Route 
          path="/register" 
          index 
          element={!isLoggedIn? <RegisterPage loggedHandler={loggedHandler}/>: <Navigate to="/user-home"/>}
        />
        <Route 
          path="/user-home"
          index 
          element={isLoggedIn? <UserHomePage loggedHandler={loggedHandler}/> : <Navigate to="/login"/>}
        />
        <Route
          path="/verify-email" 
          index 
          element={isLoggedIn? <EnterCodePage loggedHandler={loggedHandler}/> : <Navigate to="/login"/>}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
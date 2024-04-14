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
import NavBar from './components/NavBar';
import UploadPage from './pages/UploadPage'

function App()
{
  // console.log(isLoggedIn()!=null)
  const [isLoggedIn, setIsLoggedIn] = useState(isLogged());

  const loggedHandler = data => {
    setIsLoggedIn(data);
  }

  return (
    <>
      <BrowserRouter>
      <NavBar loggedUser={isLoggedIn} loggedHandler={loggedHandler}/>
        <Routes>
          <Route path="/">
            <Route
              index
              element={<HomePage loggedUser={isLoggedIn}/>}
            />
            <Route
              path=":id"
              element={<PostDetails loggedUser={isLoggedIn}/>}
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
            element={isLoggedIn? <UserHomePage loggedUser={isLoggedIn} loggedHandler={loggedHandler}/> : <Navigate to="/login"/>}
          />
          <Route
            path="/verify-email" 
            index 
            element={isLoggedIn? <EnterCodePage loggedUser={isLoggedIn} loggedHandler={loggedHandler}/> : <Navigate to="/login"/>}
          />
          <Route
            path="/post" 
            index 
            element={isLoggedIn? <UploadPage loggedUser={isLoggedIn} loggedHandler={loggedHandler}/> : <Navigate to="/login"/>}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
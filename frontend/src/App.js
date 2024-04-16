import React, {useState} from 'react';
import './App.css';

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import HomePage from './pages/HomePage';
import UserHomePage from './pages/UserHomePage'
import EnterCodePage from './pages/EnterCodePage';
import DetailsPage from './pages/DetailsPage'
import NavBar from './components/NavBar';
import UploadPage from './pages/UploadPage'
import useLoggedUser from './hooks/useLoggedUser';

function App()
{
  const {loggedUser, setLoggedUser} = useLoggedUser();


  return (
    <>
      <BrowserRouter>
      <NavBar loggedUser={loggedUser} setLoggedUser={setLoggedUser}/>
        <Routes>
          <Route path="/">
            <Route
              index
              element={<HomePage loggedUser={loggedUser}/>}
            />
            <Route
              path=":id"
              element={<DetailsPage loggedUser={loggedUser}/>}
            />
          </Route>
          <Route path="/home" index element={<Navigate to="/"/>}/>
          <Route 
            path="/login" 
            index 
            element={!loggedUser? <LoginPage setLoggedUser={setLoggedUser}/> : <Navigate to="/user-home"/>}
          />
          <Route 
            path="/register" 
            index 
            element={!loggedUser? <RegisterPage setLoggedUser={setLoggedUser}/>: <Navigate to="/user-home"/>}
          />
          <Route 
            path="/user-home"
            index 
            element={loggedUser? <UserHomePage loggedUser={loggedUser} setLoggedUser={setLoggedUser}/> : <Navigate to="/login"/>}
          />
          <Route
            path="/verify-email" 
            index 
            element={loggedUser? <EnterCodePage loggedUser={loggedUser}/> : <Navigate to="/login"/>}
          />
          <Route
            path="/post" 
            index 
            element={loggedUser? <UploadPage loggedUser={loggedUser} setLoggedUser={setLoggedUser}/> : <Navigate to="/login"/>}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
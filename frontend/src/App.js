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
import ForgotPasswordPage from './pages/ForgotPasswordPage'
import PasswordResetPage from './pages/PasswordResetPage'
import useLoggedUser from './hooks/useLoggedUser';
import useTempUser from './hooks/useTempUser';

function App()
{
  const {loggedUser, setLoggedUser, setUpdatedTTL} = useLoggedUser();
  const {tempUser, setTempUser} = useTempUser();


  return (
    <>
      <BrowserRouter>
      <NavBar loggedUser={loggedUser} setLoggedUser={setLoggedUser}/>
        <Routes>
          <Route path="/home" index element={<Navigate to="/"/>}/>
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
          <Route 
            path="/user-home"
            index 
            element={loggedUser? <UserHomePage loggedUser={loggedUser} setLoggedUser={setLoggedUser}/> : <Navigate to="/login"/>}
          />
          <Route
            path="/post" 
            index 
            element={loggedUser && loggedUser.ttl === -1? <UploadPage loggedUser={loggedUser} setLoggedUser={setLoggedUser}/> : <Navigate to="/login"/>}
          />
          <Route 
            path="/login" 
            index 
            element={!loggedUser? <LoginPage setLoggedUser={setLoggedUser} setTempUser={setTempUser}/> : <Navigate to="/user-home"/>}
          />
          <Route 
            path="/forgot-password" 
            index 
            element={!loggedUser? !tempUser? <ForgotPasswordPage setLoggedUser={setLoggedUser} setTempUser={setTempUser}/>: <Navigate to="/password-reset"/>: <Navigate to="/user-home"/>}
          />
          <Route 
            path="/password-reset" 
            index 
            element={!loggedUser? tempUser? <PasswordResetPage setLoggedUser={setLoggedUser} setTempUser={setTempUser} tempUser={tempUser}/> : <Navigate to="/forgot-password"/> : <Navigate to="/user-home"/>}
          />
          <Route 
            path="/register" 
            index 
            element={!loggedUser? <RegisterPage setLoggedUser={setLoggedUser} setTempUser={setTempUser}/>: <Navigate to="/user-home"/>}
          />
          <Route
            path="/verify-email" 
            index 
            element={loggedUser? <EnterCodePage loggedUser={loggedUser} setUpdatedTTL={setUpdatedTTL}/> : <Navigate to="/login"/>}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
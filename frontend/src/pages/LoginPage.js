import React from 'react';
import PageTitle from '../components/PageTitle';
import Login from '../components/Login';
import NavBar from '../components/NavBar';
//trying to fix heroku error
const LoginPage = props =>
{
    return(
        <div>
            <PageTitle 
                title="Log-in Page"
            />
            <Login setLoggedUser={props.setLoggedUser}/>
        </div>
    );
};

export default LoginPage;
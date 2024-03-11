import React from 'react';
import PageTitle from '../components/PageTitle';
import Login from '../components/Login';
//trying to fix heroku error
const LoginPage = () =>
{
    return(
        <div>
            <PageTitle />
            <Login />
        </div>
    );
};

export default LoginPage;
import React from 'react';
import PageTitle from '../components/PageTitle';
import EnterCode from '../components/EnterCode';
import NavBar from '../components/NavBar';
//trying to fix heroku error
const LoginPage = () =>
{
    return(
        <div>
            <PageTitle 
                title="Verification Page"
            />
            <EnterCode />
        </div>
    );
};

export default LoginPage;
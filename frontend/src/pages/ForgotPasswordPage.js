import React from 'react';
import PageTitle from '../components/PageTitle';
import ForgotPassword from '../components/ForgotPassword';

const ForgotPasswordPage = props =>
{
    return(
        <div>
            <PageTitle 
                title="Reset Password Page"
            />
            <ForgotPassword setLoggedUser={props.setLoggedUser} setTempUser={props.setTempUser} tempUser={props.tempUser}/>
        </div>
    );
};

export default ForgotPasswordPage;
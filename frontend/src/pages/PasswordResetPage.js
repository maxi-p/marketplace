import React from 'react';
import PageTitle from '../components/PageTitle';
import PasswordReset from '../components/PasswordReset';

const PasswordResetPage = props =>
{
    return(
        <div>
            <PageTitle 
                title="Password Reset Page"
            />
            <PasswordReset setLoggedUser={props.setLoggedUser} setTempUser={props.setTempUser} tempUser={props.tempUser}/>
        </div>
    );
};

export default PasswordResetPage;
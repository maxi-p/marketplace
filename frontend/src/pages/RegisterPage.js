import React from 'react';
import PageTitle from '../components/PageTitle';
import Register from '../components/Register';

const RegisterPage = props =>
{
    return(
        <div>
            <PageTitle 
                title="Register Page"
            />
            <Register setLoggedUser={props.setLoggedUser} setTempUser={props.setTempUser}/>
        </div>
    );
};

export default RegisterPage;
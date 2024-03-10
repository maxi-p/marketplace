import React, { useState } from 'react';

function buildPath(route)
{
    const app_name = 'cop4331-marketplace-98e1376d9db6'
    if (process.env.NODE_ENV === 'production')
    {
    return 'https://' + app_name + '.herokuapp.com/' + route;
    }
    else
    {
    return 'http://localhost:5000/' + route;
    }
}

function Register()
{
    var registerFName;
    var registerLName;
    var registerUsername;
    var registerPassword;
    var registerEmail;
    var registerPhoneNo;

    const [message,setMessage] = useState('');

    const doRegister = async event =>
    {
        event.preventDefault();
        // var obj = {register:registerUsername.value, password:registerPassword.value};
        // var js = JSON.stringify(obj);

        // try
        // {
        //     const response = await fetch(buildPath('api/register'), {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});

        //     var res = JSON.parse(await response.text());

        //     if( res.id <= 0 )
        //     {
        //         setMessage('User/Password combination incorrect');
        //     }
        //     else
        //     {
        //         var user = {
        //         firstname: registerFName,
        //         lastname: registerLName,
        //         username: registerUsername,
        //         password: registerPassword,
        //         email: registerEmail,
        //         phoneNumber: registerPhoneNo}
        //         localStorage.setItem('user_data', JSON.stringify(user));

        //         setMessage('');
        //         window.location.href = '/';
        //     }

        // }
        // catch(e){
        //     alert(e.toString());
        //     return;
        // }

        alert('doRegister() ' + registerFName.value + ' ' + registerLName.value + ' ' + registerUsername.value + ' ' + registerPassword.value + ' ' + registerEmail.value + ' ' + registerPhoneNo.value);
    };

    const backToLogin = async event =>
    {
        event.preventDefault();
        setMessage('');
        window.location.href = '/';
    };

    return(
        <div id="registerDiv">
            <form onSubmit={doRegister}>
                <span id="inner-title">PLEASE LOG IN</span><br />
                <input type="text" id="registerFName" placeholder="First Name" ref={(c) => registerFName = c}/><br />
                <input type="text" id="registerLName" placeholder="Last Name" ref={(c) => registerLName = c} /><br />
                <input type="text" id="registerEmail" placeholder="Email" ref={(c) => registerEmail = c}/><br />
                <input type="text" id="registerPhoneNo" placeholder="Phone number" ref={(c) => registerPhoneNo = c} /><br />
                <input type="text" id="registerName" placeholder="Username" ref={(c) => registerUsername = c}/><br />
                <input type="password" id="registerPassword" placeholder="Password" ref={(c) => registerPassword = c} /><br />
                <input type="submit" id="registerButton" className="buttons" value = "Register" onClick={doRegister} />
                <input type="submit" id="backToLogin" className="buttons" value = "Back To Login" onClick={backToLogin} />
            </form>
            <span id="registerResult">{message}</span>
        </div>
    );
};

export default Register;
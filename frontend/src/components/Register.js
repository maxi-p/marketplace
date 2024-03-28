import React, { useState } from 'react';
import validateRegister from '../logic/validator';

function buildPath(route)
{
    const app_name = 'cop4331-marketplace-98e1376d9db6'
    if (process.env.NODE_ENV === 'production')
    {
    return 'https://' + app_name + '.herokuapp.com/' + route;
    }
    else
    {
        return 'https://' + app_name + '.herokuapp.com/' + route;
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
    const [firstNameResult,setFirstNameResult] = useState('');
    const [lastNameResult,setLastNameResult] = useState('');
    const [emailResult,setEmailResult] = useState('');
    const [phoneResult,setPhoneResult] = useState('');
    const [passwordResult,setPasswordResult] = useState('');
    const [userNameResult,setUserNameResult] = useState('');

    const doRegister = async event =>
    {
        event.preventDefault();
        var obj = {
            firstname: registerFName.value,
            lastname: registerLName.value,
            username: registerUsername.value,
            password: registerPassword.value,
            email: registerEmail.value,
            phoneNumber: registerPhoneNo.value
        };

        
        const validationObject = validateRegister(obj);
        
        
        if(validationObject.status === 'valid'){
            
            var js = JSON.stringify(obj);
            try
            {
                const response = await fetch(buildPath('api/register'), {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});
                
                var res = JSON.parse(await response.text());
                if(res.error)
                {
                    setMessage(res.error);
                }
                else
                {
                    var user = {
                        firstname: registerFName.value,
                        lastname: registerLName.value,
                        username: registerUsername.value,
                        password: registerPassword.value,
                        email: registerEmail.value,
                        phoneNumber: registerPhoneNo.value
                    };
                    localStorage.setItem('user_data', JSON.stringify(user));
                    
                    setMessage('');
                    window.location.href = '/';
                }
                
            }
            catch(e){
                alert(e.toString());
                console.log(e.toString());
                return;
            }
        }
        else{
            setFirstNameResult(validationObject.firstNameMessage);
             setLastNameResult(validationObject.lastNameMessage);
                setEmailResult(validationObject.emailMessage);
                setPhoneResult(validationObject.phoneMessage);
             setPasswordResult(validationObject.passwordMessage);
             setUserNameResult(validationObject.userNameMessage);
        }

        // alert('doRegister() ' + registerFName.value + ' ' + registerLName.value + ' ' + registerUsername.value + ' ' + registerPassword.value + ' ' + registerEmail.value + ' ' + registerPhoneNo.value);
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
                <input type="text" id="registerFName" placeholder="First Name" ref={(c) => registerFName = c}/>
                <span id="firstNameResult">{firstNameResult}</span><br />
                <input type="text" id="registerLName" placeholder="Last Name" ref={(c) => registerLName = c} />
                <span id="lastNameResult">{lastNameResult}</span><br />
                <input type="text" id="registerEmail" placeholder="Email" ref={(c) => registerEmail = c}/>
                <span id="emailResult">{emailResult}</span><br />
                <input type="text" id="registerPhoneNo" placeholder="Phone number" ref={(c) => registerPhoneNo = c} />
                <span id="phoneResult">{phoneResult}</span><br />
                <input type="text" id="registerName" placeholder="Username" ref={(c) => registerUsername = c}/>
                <span id="userNameResult">{userNameResult}</span><br />
                <input type="password" id="registerPassword" placeholder="Password" ref={(c) => registerPassword = c} />
                <span id="passwordResult">{passwordResult}</span><br />
                <input type="submit" id="registerButton" className="buttons" value = "Register" onClick={doRegister} />
                <input type="submit" id="backToLogin" className="buttons" value = "Back To Login" onClick={backToLogin} />
            </form>
            <span id="registerResult">{message}</span>
        </div>
    );
};

export default Register;
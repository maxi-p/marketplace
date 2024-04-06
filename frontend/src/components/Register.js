import React, { useState } from 'react';
import validateRegister from '../logic/validator';

function buildPath(route)
{
    const app_name = 'cop4331-marketplace-98e1376d9db6'
    // if (process.env.NODE_ENV === 'production')
        return 'https://' + app_name + '.herokuapp.com/' + route;
}

function Register()
{
    const [formData, setFormData] = useState(
        {firstname: "", lastname: "", username: "", password: "", email: "", phoneNumber: ""}
    );

    const handleChange = (event) =>{
        setFormData(prevFormData => {
            setValidationState(validateRegister(
                {...prevFormData,
                [event.target.id]: event.target.value
                }
            ));
            
            return {
                ...prevFormData,
                [event.target.id]: event.target.value
            }
        });
        

    };

    const [message,setMessage] = useState('');
    const [validationState, setValidationState] = useState(
            validateRegister(formData))

    const doRegister = async event =>
    {
        event.preventDefault();
        
        if(validationState.status === 'valid'){
            var json = JSON.stringify(formData);
            try
            {
                const response = await fetch(buildPath('api/register'), {method:'POST',body:json,headers:{'Content-Type': 'application/json'}});
                var res = JSON.parse(await response.text());
                if(res.error)
                    setMessage(res.error);
                else
                {
                    var user = {firstName:res.firstName, lastName:res.lastName, id:res.id}
                    localStorage.setItem('user_data', JSON.stringify(user));
                    setMessage('');
                    window.location.href = '/verify-email';
                }
                
            }
            catch(e){
                alert(e.toString());
                console.log(e.toString());
                return;
            }
        }
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

                <input 
                    type="text"
                    id="firstname"
                    placeholder="First Name" 
                    onChange={handleChange}
                />
                <span id="firstNameResult">{validationState.firstNameMessage}</span><br />
                <input 
                    type="text"
                    id="lastname"
                    placeholder="Last Name" 
                    onChange={handleChange} 
                />
                <span id="lastNameResult">{validationState.lastNameMessage}</span><br />
                <input 
                    type="text"
                    id="username"
                    placeholder="Username" 
                    onChange={handleChange}
                />
                <span id="userNameResult">{validationState.userNameMessage}</span><br />
                <input 
                    type="password"
                    id="password"
                    placeholder="Password" 
                    onChange={handleChange} 
                />
                <span id="passwordResult">{validationState.passwordMessage}</span><br />
                <input 
                    type="text"
                    id="email"
                    placeholder="Email" 
                    onChange={handleChange}
                />
                <span id="emailResult">{validationState.emailMessage}</span><br />
                <input 
                    type="text"
                    id="phoneNumber"
                    placeholder="Phone number" 
                    onChange={handleChange} 
                />
                <span id="phoneResult">{validationState.phoneMessage}</span><br /> 
                <input 
                    type="submit"
                    id="registerButton"
                    className="buttons" 
                    value = "Register" 
                    onClick={doRegister} 
                />
                <input 
                    type="submit"
                    id="backToLogin"
                    className="buttons" 
                    value="Back To Login" 
                    onClick={backToLogin} 
                />
            </form>
            <span id="registerResult">{message}</span>
        </div>
    );
};

export default Register;
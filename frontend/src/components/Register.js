import React, { useState } from 'react';
import Route, {useNavigate} from 'react-router-dom';
import validateRegister from '../logic/validator';
import buildPath from '../logic/buildPath';

const Register = props =>
{
    const navigate = useNavigate();

    const [formData, setFormData] = useState(
        {firstname: "", lastname: "", username: "", password: "", email: "", phoneNumber: ""}
    );

    const handleChange = (event) =>{
        setFormData(prevFormData => {
            const {id, value} = event.target;
            setValidationState(validateRegister(
                {...prevFormData,
                [id]: value
                }
            ));

            return {
                ...prevFormData,
                [id]: value
            }
        });
        

    };

    const [message,setMessage] = useState('');
    const [validationState, setValidationState] = useState(validateRegister(formData))

    const doRegister = async event =>
    {
        event.preventDefault();
        
        if(validationState.status === 'valid'){
            var json = JSON.stringify(formData);
            try
            {
                console.log(json)
                const response = await fetch(buildPath('api/register'), {method:'POST',body:json,headers:{'Content-Type': 'application/json'}});
                var res = JSON.parse(await response.text());
                console.log(res)
                if(res.error)
                    setMessage(res.error);
                else
                {
                    var user = { 
                        id: res.id, 
                        username: res.username, 
                        firstName: res.firstName, 
                        lastName: res.lastName, 
                        email: res.email,
                        interestedIn: res.interestedIn,
                        phoneNumber: res.phoneNumber,
                        ttl: res.ttl,
                        aboutMe: res.aboutMe,
                        profilePic: res.profilePic
                    };
                    localStorage.setItem('user_data', JSON.stringify(user));
                    props.loggedHandler(user)
                    setMessage('');
                    navigate('/verify-email');
                }
                
            }
            catch(e){
                console.log(e.toString());
                return;
            }
        }
    };

    return(
        <div id="registerDiv">
            <form onSubmit={doRegister}>
                <span id="inner-title">PLEASE LOG IN</span><br />

                <input 
                    type="text"
                    id="firstname"
                    placeholder="First Name" 
                    value={formData.firstname}
                    onChange={handleChange}
                />
                <span id="firstNameResult">{validationState.firstNameMessage}</span><br />
                <input 
                    type="text"
                    id="lastname"
                    placeholder="Last Name" 
                    value={formData.lastname}
                    onChange={handleChange} 
                />
                <span id="lastNameResult">{validationState.lastNameMessage}</span><br />
                <input 
                    type="text"
                    id="username"
                    placeholder="Username" 
                    value={formData.username}
                    onChange={handleChange}
                />
                <span id="userNameResult">{validationState.userNameMessage}</span><br />
                <input 
                    type="password"
                    id="password"
                    placeholder="Password" 
                    value={formData.password}
                    onChange={handleChange} 
                />
                <span id="passwordResult">{validationState.passwordMessage}</span><br />
                <input 
                    type="text"
                    id="email"
                    placeholder="Email" 
                    value={formData.email}
                    onChange={handleChange}
                />
                <span id="emailResult">{validationState.emailMessage}</span><br />
                <input 
                    type="text"
                    id="phoneNumber"
                    placeholder="Phone number" 
                    value={formData.phoneNumber}
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
                    type="button"
                    id="backToLogin"
                    className="buttons" 
                    value="Login" 
                    onClick={() => navigate('/login')} 
                />
            </form>
            <span id="registerResult">{message}</span>
        </div>
    );
};

export default Register;
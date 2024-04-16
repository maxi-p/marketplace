import React, { useState } from 'react';
import Route, { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock, faEnvelope, faPhone} from '@fortawesome/free-solid-svg-icons';
import validateRegister from '../logic/validator';
import buildPath from '../logic/buildPath';

const Register = props => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState(
        { firstname: "", lastname: "", username: "", password: "", email: "", phoneNumber: "" }
    );

    const handleChange = (event) => {
        setFormData(prevFormData => {
            const { id, value } = event.target;
            setValidationState(validateRegister(
                {
                    ...prevFormData,
                    [id]: value
                }
            ));

            return {
                ...prevFormData,
                [id]: value
            }
        });


    };

    const [message, setMessage] = useState('');
    const [validationState, setValidationState] = useState(validateRegister(formData))

    const doRegister = async event => {
        event.preventDefault();

        if (validationState.status === 'valid') {
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
                        id: res._id, 
                        username: res.username, 
                        password: '',
                        firstName: res.firstName, 
                        lastName: res.lastName, 
                        email: res.email,
                        interestedIn: res.interestedIn,
                        phoneNumber: res.phoneNumber,
                        ttl: res.ttl,
                        aboutMe: res.aboutMe,
                        profilePic: res.profilePic
                    };
                    props.setLoggedUser(user)
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

    return (
        <div className="form_wrapper">
            <div className="form_container">
                <div className="title_container">
                    <h2>Register</h2>
                </div>
                <div className="row clearfix">
                    <div className="col_half">
                        <div className="input_field"> <span><FontAwesomeIcon icon={faUser} transform = "down-6"/></span>
                            <input
                                type="text"
                                id="firstname"
                                placeholder="First Name"
                                value={formData.firstname}
                                onChange={handleChange}
                            />
                        </div>
                        <span id="firstNameResult">{validationState.firstNameMessage }</span><br />
                    </div>
                    <div className="col_half">
                        <div className="input_field"> <span><FontAwesomeIcon icon={faUser} transform = "down-6"/></span>
                            <input
                                type="text"
                                id="lastname"
                                placeholder="Last Name"
                                value={formData.lastname}
                                onChange={handleChange}
                            />

                        </div>
                        <span id="lastNameResult">{validationState.lastNameMessage}</span><br />
                    </div>
                </div>
                <div className="row clearfix">
                    <div className="">
                        <form>
                            <div className="input_field">
                                <span><FontAwesomeIcon icon={faUser} transform = "down-6"/></span>
                                <input
                                    type="text"
                                    id="username"
                                    placeholder="Username"
                                    value={formData.username}
                                    onChange={handleChange}
                                />
                            </div>
                            <span id="userNameResult">{validationState.userNameMessage}</span><br />

                            <div className="input_field"> <span><FontAwesomeIcon icon={faEnvelope} transform = "down-6"/></span>
                                <input
                                    type="text"
                                    id="email"
                                    placeholder="Email"
                                    value={formData.email}
                                    onChange={handleChange}
                                />

                            </div>
                            <span id="emailResult">{validationState.emailMessage}</span><br />

                            <div className="input_field"> <span><FontAwesomeIcon icon={faPhone} transform = "down-6"/></span>
                                <input
                                    type="text"
                                    id="phoneNumber"
                                    placeholder="Phone number"
                                    value={formData.phoneNumber}
                                    onChange={handleChange}
                                />
                            </div>
                            <span id="phoneResult">{validationState.phoneMessage}</span><br />

                            <div className="input_field"> <span><FontAwesomeIcon icon={faLock} transform = "down-6"/></span>
                                <input
                                    type="password"
                                    id="password"
                                    placeholder="Password"
                                    value={formData.password}
                                    onChange={handleChange}
                                />
                            </div>
                            <span id="passwordResult">{validationState.passwordMessage}</span><br />

                            <input
                                type="submit"
                                id="registerButton"
                                className="registerButton"
                                value="Register"
                                onClick={doRegister}
                            />
                            <input
                                type="button"
                                id="backToLogin"
                                className="registerButton"
                                value="Login"
                                onClick={() => navigate('/login')}
                            />
                        </form>
                        <span id="registerResult">{message}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
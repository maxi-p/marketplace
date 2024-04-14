import React, { useState } from 'react';
import Route, { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons';
import validateRegister from '../logic/validator';
import buildPath from '../logic/validator';

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
            try {
                const response = await fetch(buildPath('api/register'), { method: 'POST', body: json, headers: { 'Content-Type': 'application/json' } });
                var res = JSON.parse(await response.text());
                if (res.error)
                    setMessage(res.error);
                else {
                    var user = { username: res.username, firstName: res.firstName, lastName: res.lastName, id: res.id }
                    localStorage.setItem('user_data', JSON.stringify(user));
                    props.loggedHandler(user)
                    setMessage('');
                    navigate('/verify-email');
                }

            }
            catch (e) {
                alert(e.toString());
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
                        <div className="input_field"> <span><i aria-hidden="true" className="fa fa-user"></i></span>
                            <input
                                type="text"
                                id="firstname"
                                placeholder="First Name"
                                value={formData.firstname}
                                onChange={handleChange}
                            />
                        </div>
                        <span id="firstNameResult">{validationState.firstNameMessage}</span><br />

                    </div>
                    <div className="col_half">
                        <div className="input_field"> <span><i aria-hidden="true" className="fa fa-user"></i></span>
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
                                <span><i aria-hidden="true" className="fa fa-user"></i></span>
                                <input
                                    type="text"
                                    id="username"
                                    placeholder="Username"
                                    value={formData.username}
                                    onChange={handleChange}
                                />
                                <span id="userNameResult">{validationState.userNameMessage}</span><br />

                            </div>
                            <div className="input_field"> <span><i aria-hidden="true" className="fa fa-envelope"></i></span>
                                <input
                                    type="text"
                                    id="email"
                                    placeholder="Email"
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                                <span id="emailResult">{validationState.emailMessage}</span><br />

                            </div>
                            <div className="input_field"> <span><i aria-hidden="true" className="fa fa-phone"></i></span>
                                <input
                                    type="text"
                                    id="phoneNumber"
                                    placeholder="Phone number"
                                    value={formData.phoneNumber}
                                    onChange={handleChange}
                                />
                                <span id="phoneResult">{validationState.phoneMessage}</span><br />
                            </div>
                            <div className="input_field"> <span><i aria-hidden="true" className="fa fa-lock"></i></span>
                                <input
                                    type="password"
                                    id="password"
                                    placeholder="Password"
                                    value={formData.password}
                                    onChange={handleChange}
                                />
                                <span id="passwordResult">{validationState.passwordMessage}</span><br />
                            </div>
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
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
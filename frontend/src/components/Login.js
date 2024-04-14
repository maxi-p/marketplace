import React, { useState } from 'react';
import Route, { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons';
import buildPath from '../logic/buildPath';

const Login = props => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState(
        { username: "", password: "" }
    );

    const handleChange = (event) => {
        const { id, value } = event.target;
        setFormData(prevFormData => {
            return {
                ...prevFormData,
                [id]: value
            }
        })
    };

    const [message, setMessage] = useState('');

    const doLogin = async (event) => {
        event.preventDefault();
        var json = JSON.stringify(formData);

        try {
            const response = await fetch(buildPath('api/login'), { method: 'POST', body: json, headers: { 'Content-Type': 'application/json' } });
            var res = JSON.parse(await response.text());

            if (res.id <= 0) {
                setMessage('User/Password combination incorrect');
            }
            else {
                var user = { username: res.username, firstName: res.firstName, lastName: res.lastName, id: res.id }
                localStorage.setItem('user_data', JSON.stringify(user));
                props.loggedHandler(user);
                setMessage('');
                navigate('/home');
            }

        }
        catch (e) {
            console.log(json)
            alert(e.toString());
            return;
        }

    };

    return (
        <div class="form_wrapper">
            <div class="form_container">
                <div class="title_container">
                    <h2>Login</h2>
                </div>

                <div class="">
                    <form className="login" onSubmit={doLogin}>
                        <div class="input_field"> <span><FontAwesomeIcon icon={faUser} transform="down-10"/></span>
                            <input
                                type="text"
                                placeholder="Username"
                                id="username"
                                onChange={handleChange}
                                className="userDetails"
                                value={formData.username}
                            />
                        </div>
                        <div class="input_field"> <span> <FontAwesomeIcon icon={faLock} transform="down-10"/></span>
                            <input
                                type="password"
                                placeholder="Password"
                                id="password"
                                onChange={handleChange}
                                className="userDetails"
                                value={formData.password}

                            />
                        </div>
                        <input
                            type="submit"
                            value="Login"
                            id="loginButton"
                            className="loginButton"
                            onClick={doLogin}
                        />
                    </form>
                </div>
            </div>

            <p class="credit"><a href="http://www.designtheway.com" target="_blank"></a></p>

            <span id="loginResult">{message}</span>
        </div >
    );
};

export default Login;
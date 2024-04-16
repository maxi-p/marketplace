import React, { useState } from 'react';
import Route, { useNavigate, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons';
import buildPath from '../logic/buildPath';

const ForgotPassword = props => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState(
        { username: ""}
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

    const doRequest = async (event) => {
        event.preventDefault();
        var json = JSON.stringify(formData);

        try {
            const response = await fetch(buildPath('api/passwordRequest'), { method: 'POST', body: json, headers: { 'Content-Type': 'application/json' } });
            var res = JSON.parse(await response.text());

            if (res.error === '') {
                props.setTempUser(
                    {
                        username: res.username,
                        email: res.email
                    })
                navigate('/password-reset');
            }
            else {
                setMessage(res.error);
            }

        }
        catch (e) {
            console.log(json)
            alert(e.toString());
            return;
        }

    };

    return (
        <div className="form_wrapper">
            <div className="form_container">
                <div className="title_container">
                    <h2>Enter Your Username</h2>
                </div>

                <div className="">
                    <form className="login" onSubmit={doRequest}>
                        <div className="input_field"> <span><FontAwesomeIcon icon={faUser} transform="down-10"/></span>
                            <input
                                type="text"
                                placeholder="Username"
                                id="username"
                                onChange={handleChange}
                                className="userDetails"
                                value={formData.username}
                            />
                        </div>
                        <input
                            type="submit"
                            value="Reset Password"
                            id="passwordResetButton"
                            className="passwordResetButton"
                            onClick={doRequest}
                        />
                        <Link to='/login'>Login</Link><br/>
                        <Link to='/register'>Register</Link>
                    </form>
                </div>
            </div>

            <p className="credit"><a href="http://www.designtheway.com" target="_blank"></a></p>

            <span id="loginResult">{message}</span>
        </div >
    );
};

export default ForgotPassword;
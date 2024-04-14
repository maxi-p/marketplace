import React, { useState } from 'react';
import Route, {useNavigate} from 'react-router-dom';
import buildPath from '../logic/buildPath';

const Login = props =>
{
    const navigate = useNavigate();

    const [formData, setFormData] = useState(
        {username: "",password: ""}
    );
    
    const handleChange = (event) => {
        const {id, value} = event.target;
        setFormData(prevFormData => {
            return {
                ...prevFormData,
                [id]: value
            }
        })
    };

    const [message,setMessage] = useState('');

    const doLogin = async (event) =>
    {
        event.preventDefault();
        var json = JSON.stringify(formData);

        try
        {
            const response = await fetch(buildPath('api/login'), {method:'POST',body:json,headers:{'Content-Type': 'application/json'}});
            var res = JSON.parse(await response.text());

            if( res.id <= 0 )
            {
                setMessage('User/Password combination incorrect');
            }
            else
            {
                var user = {username: res.username, firstName:res.firstName, lastName:res.lastName, id:res.id}
                localStorage.setItem('user_data', JSON.stringify(user));
                props.loggedHandler(user);
                setMessage('');
                navigate('/home');
            }

        }
        catch(e){
            console.log(json)
            alert(e.toString());
            return;
        }

    };

    return(
        <div id="loginDiv">
            <form  className="login" onSubmit={doLogin}>
                <span className = "LoginTitle" id="inner-title">Log in</span><br />
                <span id="inner-title">Username</span><br />
                <input 
                    type="text"
                    placeholder="Username"
                    id="username"
                    onChange={handleChange}
                    className="userdetails" 
                    value={formData.username}
                />
                <br/>
                <span id="inner-title">Password</span><br />
                <input 
                    type="password" 
                    placeholder="Password"
                    id="password"
                    onChange={handleChange}
                    className="userdetails"  
                    value={formData.password}
                    
                />
                <br/>
                <input 
                    type="submit" 
                    value = "Login"
                    id="loginButton" 
                    className="login-buttons"  
                    onClick={doLogin} 
                />
                <input 
                    type="button" 
                    value = "Register"
                    id="registerButton"
                    className="login-buttons"  
                    onClick={() => navigate('/register')} 
                />
            </form>
            <span id="loginResult">{message}</span>
        </div>
    );
};

export default Login;
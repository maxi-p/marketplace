import React, { useState } from 'react';
import Route, {useNavigate} from 'react-router-dom';

const buildPath = route =>
{
    const app_name = 'cop4331-marketplace-98e1376d9db6'
    // if (process.env.NODE_ENV === 'production')
        return 'https://' + app_name + '.herokuapp.com/' + route;
}

const Login = props =>
{
    const navigate = useNavigate();

    const [formData, setFormData] = useState(
        {username: "",password: ""}
    );

    const handleChange = (event) =>{
        setFormData(prevFormData => {
            return {
                ...prevFormData,
                [event.target.id]: event.target.value
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
                var user = {firstName:res.firstName, lastName:res.lastName, id:res.id}
                localStorage.setItem('user_data', JSON.stringify(user));
                props.loggedHandler(true);
                setMessage('');
                navigate('/home');
            }

        }
        catch(e){
            alert(e.toString());
            return;
        }

    };

    return(
        <div id="loginDiv">
            <form onSubmit={doLogin}>
                <span id="inner-title">PLEASE LOG IN</span><br />
                <input 
                    type="text"
                    placeholder="Username"
                    id="username"
                    onChange={handleChange}
                />
                <br/>
                <input 
                    type="password" 
                    placeholder="Password"
                    id="password"
                    onChange={handleChange} 
                />
                <br/>
                <input 
                    type="submit" 
                    value = "Login"
                    id="loginButton" 
                    className="buttons"  
                    onClick={doLogin} 
                />
                <input 
                    type="submit" 
                    value = "Register"
                    id="registerButton"
                    className="buttons"  
                    onClick={() => navigate('/register')} 
                />
            </form>
            <span id="loginResult">{message}</span>
        </div>
    );
};

export default Login;
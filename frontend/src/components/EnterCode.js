import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import buildPath from '../logic/buildPath';

const EnterCode =  props =>
{
    const navigate = useNavigate();
    const [token, setToken] = useState('');
    const [emailVerified, setEmailVerified] = useState(false);
    const [message,setMessage] = useState('');

    console.log(props.loggedUser);

    const handleToken = event => {
        setToken(event.target.value)
    }

    const doVerify = async event =>
    {  
        event.preventDefault();
        
        var code = {
            id: props.loggedUser.id, 
            verifyNum: token
        };

        var json = JSON.stringify(code);

        try
        {
            const response = await fetch(buildPath('api/emailVerify'), {method:'POST',body:json,headers:{'Content-Type': 'application/json'}});
            const res = JSON.parse(await response.text());

            if( res.error !== "" )
            {
                setMessage(res.error);
            }
            else    
            {
                setEmailVerified(true);
                setMessage('');
            }
        }
        catch(e){
            alert(e.toString());
            return;
        }
    };

    return(
        <div id="verifyEmailDiv">
            {(props.loggedUser.ttl !== -1) &&
            <form onSubmit={doVerify}>
                <span id="inner-title">Please paste the verification code that was sent to your email.</span><br />
                <input 
                    type="text"
                    id="verificationCode"
                    placeholder="Enter the code" 
                    value={token}
                    onChange={handleToken}
                    /><br />
                <input 
                    type="submit" 
                    id="submitCode" 
                    className="buttons" 
                    value = "Verify Code" 
                    onClick={doVerify} 
                    />
            </form>
            }
            {(emailVerified || props.loggedUser.ttl === -1) &&
                <h1>Email has been verified!!!</h1>
            }
            <span id="registerResult">{message}</span>
        </div>
    );
};

export default EnterCode;
import React, { useState } from 'react';
import buildPath from '../logic/buildPath';

const EnterCode =  props =>
{
    const [token, setToken] = useState('');
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
                props.setUpdatedTTL(res.ttl)
                setMessage('');
            }
        }
        catch(e){
            alert(e.toString());
            return;
        }
    };

    return(
        <div id="verifyEmailDiv" className="verifyEmailDiv">
            {(props.loggedUser.ttl === -1) ?
             <h1>Email has been verified!!!</h1>:
            <form onSubmit={doVerify} className="verify-code-form">
                <span className="username" id="inner-title">Please paste the verification code that was sent to your email.</span><br/>
                <input 
                    type="text"
                    id="verificationCode"
                    placeholder="Enter the code" 
                    value={token}
                    className="userDetails"
                    onChange={handleToken}
                    style={{width:'400px', margin:'auto'}}
                    /><br />
                <input 
                    type="submit" 
                    id="submitCode" 
                    className="buttons" 
                    value = "Verify Code" 
                    style={{width:'400px', margin:'auto'}}
                    onClick={doVerify} 
                    />
            </form>}
            <span id="registerResult">{message}</span>
        </div>
    );
};

export default EnterCode;
import React, { useState } from 'react';
import buildPath from '../logic/validator';

function EnterCode()
{
    var verificationCode;
    const [message,setMessage] = useState('');

    const doVerify = async event =>
    {  
        event.preventDefault();
        
        // user == {firstName: string, lastName: string, id: int}
        const user = JSON.parse(localStorage.getItem('user_data'));
        if(user == null)
            window.location.href = '/register';

        var code = {
            username: user.firstName, 
            code: verificationCode.value
        };

        var json = JSON.stringify(code);

        try
        {
            var res;
            res = {
                status:1,
                error:""
            };
            // TODO: wait for backend to finish this API
            // const response = await fetch(buildPath('api/verifyEmail'), {method:'POST',body:json,headers:{'Content-Type': 'application/json'}});
            // res = JSON.parse(await response.text());

            if( res.status == 0 )
            {
                setMessage(res.error);
            }
            else    
            {
                setMessage('');
                window.location.href = '/home';
            }
        }
        catch(e){
            alert(e.toString());
            return;
        }
    };

    return(
        <div id="verifyEmailDiv">
            <form onSubmit={doVerify}>
                <span id="inner-title">Please paste the verification code that was sent to your email.</span><br />
                <input type="text" id="verificationCode" placeholder="Enter the code" ref={(c) => verificationCode = c}/><br />
                <input type="submit" id="submitCode" className="buttons" value = "Verify Code" onClick={doVerify} />
            </form>
            <span id="registerResult">{message}</span>
        </div>
    );
};

export default EnterCode;
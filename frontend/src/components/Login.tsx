import { useState } from 'react';

function Login()
{
    var loginName: string;
    var loginPassword: string;

    const [message,setMessage] = useState('');

    const doLogin = async event =>
    {
        event.preventDefault();
        var obj = {login:loginName.value, password:loginPassword.value};
        var js = JSON.stringify(obj);

        try
        {
            const response = await fetch('http://localhost:5000/api/login', {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});
            var res = JSON.parse(await response.text());

            if( res.id <= 0 )
            {
                setMessage('User/Password combination incorrect');
            }
            else
            {
                var user = {firstName:res.firstName, lastName:res.lastName, id:res.id}
                localStorage.setItem('user_data', JSON.stringify(user));

                setMessage('');
                window.location.href = '/cards';
            }

        }
        catch(e){
            alert(e.toString());
            return;
        }

        // alert('doIt() ' + loginName.value + ' ' + loginPassword.value);
    };

    return(
        <div id="loginDiv">
            <form onSubmit={doLogin}>
                <span id="inner-title">PLEASE LOG IN</span><br />
                <input type="text" id="loginName" placeholder="Username" ref={(c) => loginName = c}/><br />
                <input type="password" id="loginPassword" placeholder="Password" ref={(c) => loginPassword = c} /><br />
                <input type="submit" id="loginButton" className="buttons" value = "Do It" onClick={doLogin} />
            </form>
            <span id="loginResult">{message}</span>
        </div>
    );
};

export default Login;
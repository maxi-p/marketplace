import { useState } from 'react';

const app_name = 'cop4331-marketplace';

const buildPath = (route: string) => {
    if(process.env.NODE_ENV === 'production'){
        return 'https://'+app_name+'.herokuapp.com'+route;
    }
    else{
        return 'http://localhost:5000'+route;
    }
};

function Login()
{
    var loginName: string;
    var loginPassword: string;

    const [message,setMessage] = useState('');

    const doLogin = async (event:React.MouseEvent<HTMLElement>) =>
    {
        event.preventDefault();
        var obj = {login:loginName.valueOf, password:loginPassword.valueOf};
        var js = JSON.stringify(obj);

        try
        {
            const response = await fetch(buildPath('/api/login'), {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});
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
            console.log("catch block.")
        }

        // alert('doIt() ' + loginName.value + ' ' + loginPassword.value);
    };

    return(
        <div id="loginDiv">
            <form>
                <span id="inner-title">PLEASE LOG IN</span><br />
                <input type="text" id="loginName" placeholder="Username" ref={(c) => {if(c !=null)loginName = c.value}}/><br />
                <input type="password" id="loginPassword" placeholder="Password" ref={(c) => {if(c !=null)loginPassword = c.value}} /><br />
                <input type="submit" id="loginButton" className="buttons" value = "Do It" onClick={doLogin} />
            </form>
            <span id="loginResult">{message}</span>
        </div>
    );
};

export default Login;
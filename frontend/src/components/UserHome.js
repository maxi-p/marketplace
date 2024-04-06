import React, { useState, useEffect } from 'react';
import Route, {useNavigate} from 'react-router-dom';
import isLoggedIn from '../logic/isLoggedIn';

const UserHome = props =>
{
    const [user] = useState(isLoggedIn());
    const navigate = useNavigate();

    const logOutHandler = () => 
    {
        localStorage.removeItem("user_data")
        props.loggedHandler(false);
        navigate('/login');
    };

    return(
      <div id="loggedInDiv">
        <img src='./avatar.png' style={{width:100,height:100}} alt="avatar"></img><br />
        {user && <span id="userName">{user.firstName} {user.lastName}</span>}<br />
        <button>Link</button><br/>
        <button>Link</button><br/>
        <button>Link</button><br/>
        <input 
            type="button" 
            id="logoutButton" 
            className="buttons" 
            value="Log Out"
            onClick={() => logOutHandler('/login')}
        /> 
      </div>
    );
};

export default UserHome;

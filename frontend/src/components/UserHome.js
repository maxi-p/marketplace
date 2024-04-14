import React from 'react';
import {useNavigate} from 'react-router-dom';

const UserHome = props =>
{
    console.log(props.loggedUser)
    const navigate = useNavigate();

    const logOutHandler = () => 
    {
        localStorage.removeItem("user_data")
        props.loggedHandler(null);
        navigate('/login');
    };

    return(
      <div id="loggedInDiv">
        <img src='./avatar.png' style={{width:100,height:100}} alt="avatar"></img><br />
        {props.loggedUser && <span id="userName">{props.loggedUser.firstName} {props.loggedUser.lastName}</span>}<br />
        <input 
            type="button" 
            id="verifyButton" 
            className="buttons" 
            value="Verify Email"
            onClick={() => navigate("/verify-email")}
        /> <br/>
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

import React, {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import { EditUser } from './EditUser';

const UserHome = props =>
{
    const [isEditing, setIsEditing] = useState(false);
    const navigate = useNavigate();

    const editHandler = event => {
      if(event === 'saved' || event.target.name === 'discard')
          setIsEditing(false)
      else
          setIsEditing(true)
    }

    const logOutHandler = () => 
    {
        localStorage.removeItem("user_data")
        props.loggedHandler(null);
        navigate('/login');
    };

    return(
      <div id="loggedInDiv">
        {isEditing && 
                    <EditUser  
                        className="edit-post-popup"
                        loggedUser={props.loggedUser}
                        editHandler={editHandler}
        />}
        <img src={props.loggedUser.profilePic? "data:image/;base64,"+props.loggedUser.profilePic.image.data:'./avatar.png'} style={{width:100,height:100}} alt="avatar"></img><br />
        {props.loggedUser && <span id="userName">{props.loggedUser.firstName} {props.loggedUser.lastName}</span>}<br />
        <input 
            type="button" 
            id="verifyButton" 
            className="buttons" 
            value="Verify Email"
            onClick={() => navigate("/verify-email")}
        /> <br/>
        <input 
            type="button" 
            id="verifyButton" 
            className="buttons" 
            value="Edit Account"
            onClick={editHandler}
        /> <br/>
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

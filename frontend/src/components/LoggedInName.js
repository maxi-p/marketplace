import React from 'react';

function LoggedInName()
{
    var _ud = localStorage.getItem('user_data');
    var ud = JSON.parse(_ud);
    // var userId = ud.id;
    var firstName = ud.firstName;
    var lastName = ud.lastName;

    const doLogout = event => 
    {
	    event.preventDefault();
        localStorage.removeItem("user_data")
        window.location.href = '/';
        // alert('doLogout');
    };    

    return(
      <div id="loggedInDiv">
        <span id="userName">Logged In As {firstName} {lastName}</span><br />
        <button type="button" id="logoutButton" className="buttons" onClick={doLogout}> Log Out </button>
      </div>
    );
};

export default LoggedInName;

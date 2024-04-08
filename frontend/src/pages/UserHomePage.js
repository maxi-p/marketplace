import React from 'react';
import PageTitle from '../components/PageTitle';
import UserHome from '../components/UserHome';
import NavBar from '../components/NavBar';

const UserHomePage = props =>
{
    return(
        <div>
            <PageTitle title="User Home Page"/>
            <UserHome loggedHandler={props.loggedHandler}/>
        </div>
    );
}

export default UserHomePage;

import React from 'react';
import PageTitle from '../components/PageTitle';
import LoggedInName from '../components/LoggedInName';
import TempHome from '../components/TempHome';
const TempHomePage = () =>
{
    return(
        <div>
            <PageTitle />
            <TempHome />
            <LoggedInName />

        </div>
    );
}

export default TempHomePage;

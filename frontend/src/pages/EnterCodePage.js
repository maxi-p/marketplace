import React from 'react';
import PageTitle from '../components/PageTitle';
import EnterCode from '../components/EnterCode';

const EnterCodePage = () =>
{
    return(
        <div>
            <PageTitle 
                title="Verification Page"
            />
            <EnterCode loggedUser={props.loggedUser} />
        </div>
    );
};

export default EnterCodePage;
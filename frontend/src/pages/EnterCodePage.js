import React from 'react';
import PageTitle from '../components/PageTitle';
import EnterCode from '../components/EnterCode';

const EnterCodePage = props =>
{
    return(
        <div>
            <PageTitle 
                title="Verification Page"
            />
            <EnterCode loggedUser={props.loggedUser} setUpdatedTTL={props.setUpdatedTTL}/>
        </div>
    );
};

export default EnterCodePage;
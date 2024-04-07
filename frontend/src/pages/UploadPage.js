import React from 'react'
import PageTitle from '../components/PageTitle';
import UploadForm from '../components/UploadForm';


const UploadPage = props => {
    return(
        <div>
            <PageTitle 
                title="Post Page"
            />
            <UploadForm loggedUser={props.loggedUser} loggedHandler={props.loggedHandler}/>
        </div>
    );
}

export default UploadPage;

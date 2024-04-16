import React from 'react'
import PageTitle from '../components/PageTitle';
import UploadPost from '../components/UploadPost';


const UploadPage = props => {
    return(
        <div>
            <PageTitle 
                title="Post Page"
            />
            <UploadPost loggedUser={props.loggedUser}/>
        </div>
    );
}

export default UploadPage;

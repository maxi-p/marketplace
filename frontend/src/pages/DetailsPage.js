import React from 'react'
import { useParams } from 'react-router-dom'
import PostDetails from '../components/PostDetails';
import UserDetails from '../components/UserDetails';

const DetailsPage = props => {
    const { id } = useParams();

    return (<div>
                {id.toString().includes('pst')? (<PostDetails loggedUser={props.loggedUser} id={id.toString().slice(4)}/>):(<UserDetails loggedUser={props.loggedUser} id={id.toString().slice(4)}/>)}
            </div>)
}

export default DetailsPage;

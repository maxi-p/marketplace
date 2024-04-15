import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom';
import buildPath from '../logic/buildPath';

export const DeletePost = props => {
    const navigate = useNavigate();
    const [message,setMessage] = useState('');

    const doDelete = async (event) =>
    {
        event.preventDefault();
        var json = JSON.stringify({id: props.post._id});

        try
        {
            const response = await fetch(buildPath('api/deletePost'), {method:'POST',body:json,headers:{'Content-Type': 'application/json'}});
            var res = JSON.parse(await response.text());

            if( res.id <= 0 )
            {
                setMessage('Post wasn\'t deleted');
            }
            else
            {
                setMessage('');
                navigate('/');
            }

        }
        catch(e){
            console.log(json)
            alert(e.toString());
            return;
        }
    };
  return (
    <div id="editPostDiv" className= "editPostDiv">
            <form onSubmit={doDelete}>
                <span id="inner-title">Are You Sure You Want to Delete this Post?</span><br />
                <br/>
                <input 
                    type="submit" 
                    value = "Yes, Delete!"
                    id="saveButton" 
                    className="buttons"  
                />
                <input 
                    type="button" 
                    value = "No"
                    id="saveButton" 
                    name="discard"
                    className="buttons"
                    onClick={props.deleteHandler}  
                />
            </form>
            <span id="postResult">{message}</span>
        </div>
  )
}

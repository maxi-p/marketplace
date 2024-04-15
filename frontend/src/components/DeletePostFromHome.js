import React, { useState } from 'react';
import buildPath from '../logic/buildPath';

export const DeletePostFromHome = props => {
    const [message,setMessage] = useState('');
    console.log(props.post)
    const doDelete = async (event) =>
    {
        event.preventDefault();
        var json = JSON.stringify({id: props.post._id});

        try
        {
            const response = await fetch(buildPath('api/deletePost'), {method:'POST',body:json,headers:{'Content-Type': 'application/json'}});
            var res = JSON.parse(await response.text());

            if( res.error !== '' )
            {
                setMessage(res.error);
            }
            else
            {
                setMessage('');
                props.setOnePost({...props.post, delete:true})
                props.closeDeleteHandler();
            }

        }
        catch(e){
            console.log(e.toString());
            return;
        }
    };
  return (
    <div id="editPostDiv">
            <form onSubmit={doDelete}>
                <span id="inner-title">Are You Sure You Want to Delete this Post?</span><br />
                <br/>
                <input 
                    type="submit" 
                    value = "Yes, Detele!"
                    id="saveButton" 
                    className="buttons"  
                />
                <input 
                    type="button" 
                    value = "Discard"
                    id="saveButton" 
                    name="discard"
                    className="buttons"
                    onClick={props.closeDeleteHandler}  
                />
            </form>
            <span id="postResult">{message}</span>
        </div>
  )
}

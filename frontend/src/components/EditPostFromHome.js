import React, { useState } from 'react';
import buildPath from '../logic/buildPath';

export const EditPostFromHome = props => {
    const [formData, setFormData] = useState({...props.post, id:props.post._id});
    
    const handleChange = (event) => {
        const {id, value} = event.target;
        setFormData(prevFormData => {
            return {
                ...prevFormData,
                [id]: value
            }
        })
    };

    const [message,setMessage] = useState('');

    const doSave = async (event) =>
    {
        event.preventDefault();
        var json = JSON.stringify(formData);

        try
        {
            const response = await fetch(buildPath('api/editPost'), {method:'POST',body:json,headers:{'Content-Type': 'application/json'}});
            var res = JSON.parse(await response.text());

            if( res.id <= 0 )
            {
                setMessage('Post wasn\'t edited');
            }
            else
            {
                setMessage('');
                const newPosts = [];
                props.allPosts.map(post => {
                    if(post._id !== formData.id){
                        newPosts.push(post);
                    }
                    else{
                        newPosts.push(formData)
                    }
                });
                props.setAllPosts(newPosts);
                props.closeEditHandler();
            }

        }
        catch(e){
            console.log(json)
            alert(e.toString());
            return;
        }
    };
  return (
    <div id="editPostDiv">
            <form onSubmit={doSave}>
                <span id="inner-title">Edit Your Post</span><br />
                <input 
                    type="text"
                    placeholder="name"
                    id="name"
                    onChange={handleChange}
                    value={formData.name}
                />
                <br/>
                <input 
                    type="text" 
                    placeholder="genre"
                    id="genre"
                    onChange={handleChange} 
                    value={formData.genre}
                />
                <br/>
                <input 
                    type="price" 
                    placeholder="price"
                    id="price"
                    onChange={handleChange} 
                    value={formData.price}
                />
                <br/>
                <input 
                    type="text" 
                    placeholder="desc"
                    id="desc"
                    onChange={handleChange} 
                    value={formData.desc}
                />
                <br/>
                <input 
                    type="text" 
                    placeholder="condition"
                    id="condition"
                    onChange={handleChange} 
                    value={formData.condition}
                />
                <br/>
                <input 
                    type="submit" 
                    value = "Save"
                    id="saveButton" 
                    className="buttons"  
                />
                <input 
                    type="button" 
                    value = "Discard"
                    id="saveButton" 
                    name="discard"
                    className="buttons"
                    onClick={props.closeEditHandler}  
                />
            </form>
            <span id="postResult">{message}</span>
        </div>
  )
}

import React, { useState } from 'react';
import buildPath from '../logic/buildPath';

export const EditPost = props => {
    const [formData, setFormData] = useState({...props.post, id:props.post._id});
    
    const handleChange = (event) => {
        const {id, value,type,files} = event.target;
        console.log(event)
            setFormData(prevFormData => {
                return {
                    ...prevFormData,
                    [id]: type === 'file'? files[0] :value
                }
            })
    };

    const [message,setMessage] = useState('');

    const doSave = async (event) =>
    {
        event.preventDefault();
        const form = new FormData();
        for (const property in formData) {
            form.append(property, formData[property]) 
        }

        try
        {
            const response = await fetch(buildPath('api/editPost'), {method:'POST',body:form});
            var res = JSON.parse(await response.text());

            if( res.id <= 0 )
            {
                setMessage('Post wasn\'t edited');
            }
            else
            {
                setMessage('');
                props.editHandler('saved')
                props.setHasUpdated(true)
            }

        }
        catch(e){
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
                    type="file" 
                    placeholder="image"
                    accept="image/*"
                    id="image"
                    onChange={handleChange} 
                /><br/>
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
                    onClick={props.editHandler}  
                />
            </form>
            <span id="postResult">{message}</span>
        </div>
  )
}

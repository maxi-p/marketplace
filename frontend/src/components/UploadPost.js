import React, { useState } from 'react';
import Route, {useNavigate} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faComment, faDollarSign, faLightbulb, faPencil, faStar } from '@fortawesome/free-solid-svg-icons';
import buildPath from '../logic/buildPath';

const UploadForm = props => 
{
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
                const newPosts = [];
                console.log("setting")
                props.setModified(true);
                props.closeEditHandler();
            }

        }
        catch(e){
            alert(e.toString());
            return;
        }
    };
    return(

        <div className="form_wrapper">
            <div className="form_container">
                <div className="title_container">
                    <h2>Upload Post</h2>
                </div>
                <div className="row clearfix">
                        <div className="input_field"> <span><FontAwesomeIcon icon={faPencil} transform = "down-6"/></span>
                            <input 
                                type="text"
                                placeholder="name"
                                id="name"
                                onChange={handleChange}
                                value={formData.name}
                            />
                        </div>
                        <div className="input_field"> <span><FontAwesomeIcon icon={faLightbulb} transform = "down-6"/></span>
                            <input 
                                type="text" 
                                placeholder="genre"
                                id="genre"
                                onChange={handleChange} 
                                value={formData.genre}
                            />
                        </div>
                    <div className="uploadPostDiv">
                        <form onSubmit={doPost}>
                            <div className="input_field">
                                <span><FontAwesomeIcon icon={faDollarSign} transform = "down-6"/></span>
                                <input 
                                    type="price" 
                                    placeholder="price"
                                    id="price"
                                    onChange={handleChange} 
                                    value={formData.price}
                                />
                            </div>

                            <div className="input_field"> <span><FontAwesomeIcon icon={faComment} transform = "down-6"/></span>
                                <input 
                                    type="text" 
                                    placeholder="desc"
                                    id="desc"
                                    onChange={handleChange} 
                                    value={formData.desc}
                                />
                            </div>
                          

                            <div className="input_field"> <span><FontAwesomeIcon icon={faStar} transform = "down-6"/></span>
                                <input 
                                    type="text" 
                                    placeholder="condition"
                                    id="condition"
                                    onChange={handleChange} 
                                    value={formData.condition}
                                />
                            </div>

                            <input 
                                type="file" 
                                placeholder="image"
                                accept="image/*"
                                id="image"
                                onChange={handleChange} 
                            /><br/>
                            <input 
                                type="submit" 
                                value = "Post"
                                id="postButton" 
                                className="postUploadButton"  
                            />
                        </form>
                        <span id="postResult">{message}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UploadForm;

import React, { useState } from 'react';
import Route, {useNavigate} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faComment, faDollarSign, faLightbulb, faPencil, faStar } from '@fortawesome/free-solid-svg-icons';
import buildPath from '../logic/buildPath';

const UploadForm = props => 
{
    const navigate = useNavigate();
    const [formData, setFormData] = useState(
        {username: props.loggedUser.username, name:'', genre:'', price:'', desc:'', condition:''}
    );
    
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

    const doPost = async (event) =>
    {
        event.preventDefault();
        var json = JSON.stringify(formData);

        try
        {
            const response = await fetch(buildPath('api/createPost'), {method:'POST',body:json,headers:{'Content-Type': 'application/json'}});
            var res = JSON.parse(await response.text());

            if( res.id <= 0 )
            {
                setMessage('Post wasn\'t added');
            }
            else
            {
                setMessage('');
                navigate('/'+res._id);
            }

        }
        catch(e){
            console.log(json)
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
                        <form>
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

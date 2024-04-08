import React, { useState } from 'react';
import Route, {useNavigate} from 'react-router-dom';
import buildPath from '../logic/buildPath';

const UploadForm = props => 
{
    const navigate = useNavigate();
    console.log(props.loggedUser);
    const [formData, setFormData] = useState(
        // 'maxi-p' nick name is hardcoded
        // TODO: once API adds a username attribute into return of login and register API, fix this
        {username: 'maxi-p', name:'', genre:'', price:'', desc:'', condition:''}
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
        <div id="uploadPostDiv">
            <form onSubmit={doPost}>
                <span id="inner-title">Enter Your Post Details</span><br />
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
                    value = "Post"
                    id="postButton" 
                    className="buttons"  
                />
            </form>
            <span id="postResult">{message}</span>
        </div>
    );
}

export default UploadForm;

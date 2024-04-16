import React, { useState } from 'react';
import buildPath from '../logic/buildPath';

export const EditUser = props => {
    const [formData, setFormData] = useState({...props.loggedUser});
    const handleChange = (event) => {
        const {id, value,type,files} = event.target;
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
            const response = await fetch(buildPath('api/editUser'), {method:'POST',body:form});
            var res = JSON.parse(await response.text());

            if( res.error !== '' )
            {
                setMessage('User wasn\'t edited');
            }
            else
            {
                var user = { 
                    id: res.id, 
                    username: res.username, 
                    password: '',
                    firstName: res.firstName, 
                    lastName: res.lastName, 
                    email: res.email,
                    interestedIn: res.interestedIn,
                    phoneNumber: res.phoneNumber,
                    ttl: res.ttl,
                    aboutMe: res.aboutMe,
                    profilePic: res.profilePic
                };
                props.setLoggedUser(user);
                setMessage('');
                props.editHandler('saved');
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
                <span id="inner-title">Edit Your Profile</span><br />
 
                <input 
                    type="text"
                    placeholder="First Name"
                    id="firstName"
                    onChange={handleChange}
                    value={formData.firstName}
                />
                <br/>
                <input 
                    type="text" 
                    placeholder="Last Name"
                    id="lastName"
                    onChange={handleChange} 
                    value={formData.lastName}
                />
                <br/>
                <input 
                    type="text" 
                    placeholder="Email"
                    id="email"
                    onChange={handleChange} 
                    value={formData.email}
                />
                <br/>
                <input 
                    type="text" 
                    placeholder="Phone Number"
                    id="phoneNumber"
                    onChange={handleChange} 
                    value={formData.phoneNumber}
                />
                <br/>
                <input 
                    type="text" 
                    placeholder="About me"
                    id="aboutMe"
                    onChange={handleChange} 
                    value={formData.aboutMe}
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

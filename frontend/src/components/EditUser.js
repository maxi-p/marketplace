import React, { useState } from 'react';
import buildPath from '../logic/buildPath';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope, faPhone, faComment } from '@fortawesome/free-solid-svg-icons';

export const EditUser = props => {
    const [formData, setFormData] = useState({ ...props.loggedUser });

    const handleChange = (event) => {
        const { id, value, type, files } = event.target;
        setFormData(prevFormData => {
            return {
                ...prevFormData,
                [id]: type === 'file' ? files[0] : value
            }
        })
    };


    const [message, setMessage] = useState('');

    const doSave = async (event) => {
        event.preventDefault();
        console.log("form data", formData);
        const form = new FormData();
        for (const property in formData) {
            form.append(property, formData[property])
        }
        try {
            const response = await fetch(buildPath('api/editUser'), { method: 'POST', body: form });
            var res = JSON.parse(await response.text());

            if (res.error !== '') {
                setMessage('User wasn\'t edited');
            }
            else {
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
        catch (e) {
            alert(e.toString());
            return;
        }
    };
    return (
        <div id="editPostDiv" className="editPostDiv">
            <div className="form_container">
                <div className="title_container">
                    <h2>Edit User</h2>
                </div>
                <div className="row clearfix">
                    <form onSubmit={doSave}>
                        <div className="input_field"> <span><FontAwesomeIcon icon={faUser} transform="down-6" /></span>
                            <input
                                type="text"
                                placeholder="First Name"
                                id="firstName"
                                onChange={handleChange}
                                value={formData.firstName}
                            />
                        </div>
                        <div className="input_field"> <span><FontAwesomeIcon icon={faUser} transform="down-6" /></span>
                            <input
                                type="text"
                                placeholder="Last Name"
                                id="lastName"
                                onChange={handleChange}
                                value={formData.lastName}
                            />
                        </div>
                        <div className="uploadPostDiv">
                            <div className="input_field">
                                <span><FontAwesomeIcon icon={faEnvelope} transform="down-6" /></span>
                                <input
                                    type="text"
                                    placeholder="Email"
                                    id="email"
                                    onChange={handleChange}
                                    value={formData.email}
                                />
                            </div>

                            <div className="input_field"> <span><FontAwesomeIcon icon={faPhone} transform="down-6" /></span>
                                <input
                                    type="text"
                                    placeholder="Phone Number"
                                    id="phoneNumber"
                                    onChange={handleChange}
                                    value={formData.phoneNumber}
                                />
                            </div>


                            <div className="input_field"> <span><FontAwesomeIcon icon={faComment} transform="down-6" /></span>
                                <input
                                    type="text"
                                    placeholder="About me"
                                    id="aboutMe"
                                    onChange={handleChange}
                                    value={formData.aboutMe}
                                />
                            </div>
                            <input
                                type="file"
                                placeholder="image"
                                accept="image/*"
                                id="image"
                                onChange={handleChange}
                            /><br />
                            <input
                                type="submit"
                                value="Save"
                                id="saveButton"
                                className="buttons"
                            />

                            <input
                                type="button"
                                value="Discard"
                                id="saveButton"
                                name="discard"
                                className="buttons"
                                onClick={props.editHandler}
                            />
                            <span id="userResult">{message}</span>
                        </div>
                    </form>
                </div>

            </div>
            {/* <form onSubmit={doSave}>
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
            </form> */}
        </div>
    )
}
import React, { useState, useEffect } from 'react';

const SearchBar = props =>
{
    const [message, setMessage] = useState('');
    const [formData, setFormData] = useState(
        {
            string: "",
            username: false,
            name: false,
            genre: false
        }
    );

    const handleChange = (event) => { 
        const {name, value, type, checked} = event.target;
        setFormData(prevFormData => {
            return {
                ...prevFormData,
                [name]: type === "checkbox"? checked : value
            }
        } )
    }

    const submitHandler = async event => {
        // TODO: check the searching logic once API merges the updated search api
        event.preventDefault();
        let obj = { username: '', name: '', genre: '' }

        if(formData.name === true)
            obj = {...obj, name:formData.string};
        if(formData.username === true)
            obj = {...obj, username:formData.string};
        if(formData.genre === true)
            obj = {...obj, genre:formData.string};
        if(formData.string !== '' && formData.name === false && formData.username === false && formData.genre === false)
            obj = {username: formData.string, name: formData.string, genre: formData.string};
        
        props.setAllPosts(obj);
    }

    // 5 15 84 1

    return(
        <div className="search">
            <form onSubmit={submitHandler}>
                <input
                    onChange={handleChange}
                    name="string"
                    value={formData.string}
                    placeholder='Search-Open-Market'
                    className="search-Bar"
                />
                <button className="search-Button">Search</button>
                <div className='search-Checkboxes'>
                    <input 
                        type="checkbox" 
                        id="username" 
                        name="username"
                        checked={formData.username}
                        onChange={handleChange}
                        className="search-box"
                        
                    />
                    <label htmlFor="username"> author</label>
                    <input 
                        type="checkbox" 
                        id="name" 
                        name="name"
                        checked={formData.name}
                        onChange={handleChange}
                        className="search-box"
                    />
                    <label htmlFor="name"> name </label>
                    <input 
                        type="checkbox" 
                        id="genre" 
                        name="genre"
                        checked={formData.genre}
                        onChange={handleChange}
                        className="search-box"
                    />
                    <label htmlFor="genre"> genre </label>
                    <input 
                        type="checkbox" 
                        id="saved" 
                        name="saved"
                        checked={props.saved}
                        onChange={props.setSaved}
                        className="search-box"
                    />
                    <label htmlFor="saved"> saved </label><br/>
                    <span>{message}</span><br/>
                </div>
                
            </form>
        </div>
    );
};

export default SearchBar;

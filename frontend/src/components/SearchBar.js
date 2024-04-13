import React, { useState, useEffect } from 'react';
import buildPath from '../logic/buildPath';
import FadeLoader from 'react-spinners/FadeLoader'

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

    useEffect(() => {
        const getAllPosts = async () => {
            props.setLoading(true);
            const json = JSON.stringify({ username:'', name:'', genre:''});
            const response = await fetch(buildPath('api/searchPost'), {method:'POST',body:json,headers:{'Content-Type': 'application/json'}});
            var res = JSON.parse(await response.text());
            props.setAllPosts(res.results)
            // TODO: remove this mimicking network request time (0.5 seconds)
            setTimeout(()=>{props.setLoading(false)}, 250)
        };
        getAllPosts();
    },[])

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
        
        console.log(obj)
        props.setLoading(true);
        const json = JSON.stringify(obj);
        const response = await fetch(buildPath('api/searchPost'), {method:'POST',body:json,headers:{'Content-Type': 'application/json'}});
        var res = JSON.parse(await response.text());
        if(res.error === ''){
            setMessage('')
            props.setAllPosts(res.results)
        }
        else
            setMessage(res.error)

        // TODO: remove this mimicking network request time (0.5 seconds)
        setTimeout(()=>{props.setLoading(false)}, 250)

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
                <div>
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
                    <label htmlFor="genre"> genre </label><br/>
                    <span>{message}</span><br/>
                </div>
                
            </form>
        </div>
    );
};

export default SearchBar;

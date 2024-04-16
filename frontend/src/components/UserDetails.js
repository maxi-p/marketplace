import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import PostInUserPage from './PostInUserPage';
import buildPath from '../logic/buildPath';
import useSearch from '../hooks/useSearch';
import FadeLoader from 'react-spinners/FadeLoader'

const PostDetails = props => {
    const id = props.id;
    const [saved, setSaved] = useState(false);
    const navigate = useNavigate();
    if(props.loggedUser && id === props.loggedUser.username){
        navigate('/user-home');
    }
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(true);
    const loadingHandler = data => {
        setLoading(data);
    }

    const handleSaved = event =>{
        setSaved(event.target.checked)
    }

    const {allPosts, setAllPosts, setOnePost} = useSearch(loadingHandler,{ username: id, name:'', genre:''},props.loggedUser);

    useEffect(() => {
        const getUser = async() => {
            const json = JSON.stringify({ username: id});
            const response = await fetch(buildPath('api/searchUser'), {method:'POST',body:json,headers:{'Content-Type': 'application/json'}});
            var res = JSON.parse(await response.text());
            console.log("user",res)
            setUser(res)
        }
        getUser();
    },[]);

    const posts = allPosts.map(post => {
        return (
            <PostInUserPage
                loggedUser={props.loggedUser}
                setOnePost={setOnePost}
                key={post._id}
                obj={post}
            />
        )
    });

    const savedPosts = allPosts.map(post => {
        if (post.interested)
        return (
            <PostInUserPage
                loggedUser={props.loggedUser}
                setOnePost={setOnePost}
                key={post._id}
                obj={post}
            />
        )
    });

    return ( <div>
                {loading? 
                (<div className="spinner-container">
                    <FadeLoader
                        className="spinner-loader"    
                        color="#1a2e68"
                        size={200}
                        loading={loading}
                    />
                </div>):
                (<div className="post-detail-container">
                    <section className='post-details'>
                        <h1>{user.username}</h1>
                        <div className="card">
                            <img src={user.image? "data:image/;base64,"+user.image.image.data:'./post.png'} className="card--image" />
                            <div className="card--stats">
                                <img src="./star.png" className="card--star" />
                                <span className="gray"> • </span>
                                <span className="gray">{user.username}</span>
                            </div>
                            <p className="card--title">First Name: {user.firstName}</p>
                            <p className="card--title">Last Name: {user.lastName}</p>
                            <p className="card--title">About Me: {user.aboutMe}</p>
                            <p className="card--title">Email: {user.email}</p>
                            <p className="card--title">Phone Number: {user.phoneNumber}</p>
                        </div>
                    </section>
                    <section>
                        <h1>Posted Products:</h1>
                        <input 
                            type="checkbox" 
                            id="saved" 
                            name="saved"
                            checked={saved}
                            onChange={handleSaved}
                            className="search-box"
                        /><label htmlFor="saved" style={{color:'black'}}> saved </label>
                        {saved?
                        <div>
                            {savedPosts}
                        </div>:
                        <div>
                            {posts}
                        </div>}
                    </section>
                </div>)}
            </div>)
}

export default PostDetails;

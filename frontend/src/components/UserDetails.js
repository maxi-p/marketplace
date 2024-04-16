import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import PostInUserPage from './PostInUserPage';
import buildPath from '../logic/buildPath';
import useSearchNoRegex from '../hooks/useSearchNoRegex';
import FadeLoader from 'react-spinners/FadeLoader'

const PostDetails = props => {
    const id = props.id;
    const [saved, setSaved] = useState(false);
    const navigate = useNavigate();
    if (props.loggedUser && id === props.loggedUser.username) {
        navigate('/user-home');
    }
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(true);
    const loadingHandler = data => {
        setLoading(data);
    }

    const handleSaved = event => {
        if(event.target.id === 'allPosts'){
            setSaved(false);
        }
        else{
            setSaved(true);
        }
    }

    const { allPosts, setAllPosts, setOnePost } = useSearchNoRegex(loadingHandler, { username: id, name: '', genre: '' }, props.loggedUser);

    useEffect(() => {
        const getUser = async () => {
            const json = JSON.stringify({ username: id });
            const response = await fetch(buildPath('api/searchUser'), { method: 'POST', body: json, headers: { 'Content-Type': 'application/json' } });
            var res = JSON.parse(await response.text());
            console.log("user", res.results[0])
            if(res.error === ''){
                setUser(res.results[0])
            }
        }
        getUser();
    }, []);

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

    return (<div style={{marginTop:'10px'}}>
        {loading ?
            (<div className="spinner-container">
                <FadeLoader
                    className="spinner-loader"
                    color="#1a2e68"
                    size={200}
                    loading={loading}
                />
            </div>) :
            (<div id="loggedInDiv">
                <div className='profile-top-section'>
                    <div className='top-holder-section'>
                        <div className='avatar-section'>
                            <div className='profile-avatar'>
                                <img src={user.image ? "data:image/;base64," + user.image.image.data : './avatar.png'} alt="avatar"/>
                            </div>
                            <span className='username'>{user.username}</span>    
                        </div>
                        <div className='details-section'>
                            <section className='user-info'>
                                <div className="userDetails">
                                    <div className="card--stats">
                                    </div>
                                    <p className="userprofile-name">{user.firstname} {user.lastname}</p>
                                    <p className="card--title">About Me: {user.aboutMe}</p>
                                    <p className="card--title">Email: {user.email}</p>
                                    <p className="card--title">Phone Number: {user.phoneNumber}</p>
                                </div>
                            </section>
                        </div>
                    </div>
                </div>
                {props.loggedUser && 
                <div className='profile-buttons-section'>
                    <div className='button-holder-section'>
                        <div className='profile-button'>
                            {props.loggedUser.ttl === -1 && <input
                                type="button"
                                id="allPosts"
                                className="buttons"
                                value={"All Posts by "+user.firstname}
                                onClick={handleSaved}
                            />}
                        </div>
                        <div className='profile-button'>
                            {props.loggedUser.ttl === -1 && <input
                                type="button"
                                id="justSaved Posts"
                                className="buttons"
                                value={"Posts by "+user.firstname+" I Saved"}
                                onClick={handleSaved}
                            />}
                        </div>
                    </div>
                </div>}
                <div className='profile-posts-section'>
                    <div className='posts-holder-section'>
                        <span className='name-of-post-type'>{saved? "Posts By "+user.firstname+" I Saved": "All Posts By "+user.firstname}</span>
                        <div className='loaded-posts-section'>
                        {loading ?
                        (<div className="spinner-container">
                            <FadeLoader
                                className="spinner-loader in-homepage"
                                color="#1a2e68"
                                size={200}
                                loading={loading}
                                />
                        </div>) : 
                        (<div className="post-detail-container">
                            {saved ?
                                <div className='home-post-holder-flex'>
                                    {savedPosts}
                                </div> :
                                <div className='home-post-holder-flex'>
                                    {posts}
                                </div>}
                        </div>)}
                        </div>
                    </div>

                </div>

                </div>)}
            </div>)
}

export default PostDetails;

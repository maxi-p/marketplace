import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { EditUser } from './EditUser';
import PostInUserPage from './PostInUserPage';
import useSearchNoRegex from '../hooks/useSearchNoRegex';
import FadeLoader from 'react-spinners/FadeLoader'
import { DeletePostFromHome } from './DeletePostFromHome';
import { EditPostFromHome } from './EditPostFromHome';

const UserHome = props => {
    const [isEditing, setIsEditing] = useState(false);
    const [post, setPost] = useState({});
    const [isEditingPost, setIsEditingPost] = useState(false);
    const [isDeletingPost, setIsDeletingPost] = useState(false);
    const [saved, setSaved] = useState(false);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const loadingHandler = data => {
        setLoading(data);
    }
    const { allPosts, setAllPosts, setOnePost, setOnePostFetch } = useSearchNoRegex(loadingHandler, { username: props.loggedUser.username, name: '', genre: '' }, props.loggedUser);
    const openEditHandler = data => {
        setPost(data);
        setIsEditingPost(true);
    }

    const openDeleteHandler = data => {
        setPost(data);
        setIsDeletingPost(true);
    }

    const closeEditHandler = event => {
        setIsEditingPost(false);
    }

    const closeDeleteHandler = event => {
        setIsDeletingPost(false);
    }

    const handleSaved = event => {
        if(event.target.id === 'allMyPosts'){
            setSaved(false);
        }
        else{
            setSaved(true);
        }
        
    }

    const editHandler = event => {
        if (event === 'saved' || event.target.name === 'discard')
            setIsEditing(false)
        else
            setIsEditing(true)
    }

    const logOutHandler = () => {
        localStorage.removeItem("user_data")
        props.setLoggedUser(null);
        navigate('/login');
    };

    const posts = allPosts.map(post => {
        return (
            <PostInUserPage
                loggedUser={props.loggedUser}
                setOnePost={setOnePost}
                key={post._id}
                obj={post}
                openEditHandler={openEditHandler}
                openDeleteHandler={openDeleteHandler}
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
                openEditHandler={openEditHandler}
                openDeleteHandler={openDeleteHandler}
            />
        )

    });

    return (
        <div className="loggedInDiv" style={{marginTop: '15px'}}>
            {isEditing &&
                <EditUser
                    className="edit-post-popup"
                    loggedUser={props.loggedUser}
                    setLoggedUser={props.setLoggedUser}
                    editHandler={editHandler}
                />}
            <div className='profile-top-section'>
                <div className='top-holder-section'>
                    <div className='avatar-section'>
                        <div className='profile-avatar'>
                            <img  src={props.loggedUser.profilePic ? "data:image/;base64," + props.loggedUser.profilePic.image.data : './avatar.png'} alt="avatar"></img>
                        </div>
                        <span className='username'>{props.loggedUser.username}</span>    
                    </div>
                    <div className='details-section'>
                        <section className='user-info'>
                            <div className="userDetails">
                                <div className="card--stats">
                                </div>
                                <p className="userprofile-name">{props.loggedUser.firstName} {props.loggedUser.lastName}</p>
                                <p className="card--title">About Me: {props.loggedUser.aboutMe}</p>
                                <p className="card--title">Email: {props.loggedUser.email}</p>
                                <p className="card--title">Phone Number: {props.loggedUser.phoneNumber}</p>
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
                            id="allMyPosts"
                            className="buttons"
                            value="Posts by Me"
                            onClick={handleSaved}
                        />}
                    </div>
                    <div className='profile-button'>
                        {props.loggedUser.ttl === -1 && <input
                            type="button"
                            id="justMySaved Posts"
                            className="buttons"
                            value="Saved Posts by Me"
                            onClick={handleSaved}
                        />}
                    </div>
                    <div className='profile-button'>
                        {props.loggedUser.ttl === -1 && <input
                            type="button"
                            id="verifyButton"
                            className="buttons"
                            value="Edit Account"
                            onClick={editHandler}
                        />} 
                    </div>
                    <div className='profile-button'>
                        <input
                            type="button"
                            id="verifyButton"
                            className="buttons"
                            value="Verify Email"
                            onClick={() => navigate("/verify-email")}
                        />
                    </div>
                    <div className='profile-button'>
                        <input
                            type="button"
                            id="logoutButton"
                            className="buttons"
                            value="Log Out"
                            onClick={() => logOutHandler('/login')}
                        />
                    </div>
                </div>
            </div>}
            {props.loggedUser && 
            <div className='profile-posts-section'>
                <div className='posts-holder-section'>
                    <span className='name-of-post-type'>{saved? "Saved Posts By Me": "All Posts By Me"}</span>
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
                            {isDeletingPost &&
                                <DeletePostFromHome
                                className="delete-post-popup"
                                post={post}
                                closeDeleteHandler={closeDeleteHandler}
                                setOnePost={setOnePost}
                                />}
                            {isEditingPost &&
                                <EditPostFromHome
                                className="edit-post-popup"
                                post={post}
                                closeEditHandler={closeEditHandler}
                                setOnePostFetch={setOnePostFetch}
                                />}
                            <br /><br />
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
            </div>}

        </div>
    );
};

export default UserHome;

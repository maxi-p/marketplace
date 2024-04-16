import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { EditUser } from './EditUser';
import PostInUserPage from './PostInUserPage';
import useSearch from '../hooks/useSearch';
import FadeLoader from 'react-spinners/FadeLoader'

const UserHome = props => {
    const [isEditing, setIsEditing] = useState(false);
    const [saved, setSaved] = useState(false);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const loadingHandler = data => {
        setLoading(data);
    }
    const { allPosts, setAllPosts, setOnePost } = useSearch(loadingHandler, { username: props.loggedUser.username, name: '', genre: '' }, props.loggedUser);

    const handleSaved = event => {
        setSaved(event.target.checked)
    }

    const editHandler = event => {
        if (event === 'saved' || event.target.name === 'discard')
            setIsEditing(false)
        else
            setIsEditing(true)
    }

    const logOutHandler = () => {
        localStorage.removeItem("user_data")
        props.loggedHandler(null);
        navigate('/login');
    };

    const posts = allPosts.map(post => {
        return (
            <PostInUserPage
                loggedNick={props.loggedUser ? props.loggedUser.username : ''}
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
                    loggedNick={props.loggedUser ? props.loggedUser.username : ''}
                    loggedUser={props.loggedUser}
                    setOnePost={setOnePost}
                    key={post._id}
                    obj={post}
                />
            )
    });

    return (
        <div id="loggedInDiv">
            {isEditing &&
                <EditUser
                    className="edit-post-popup"
                    loggedUser={props.loggedUser}
                    editHandler={editHandler}
                />}
            <img src={props.loggedUser.profilePic ? "data:image/;base64," + props.loggedUser.profilePic.image.data : './avatar.png'} style={{ width: 100, height: 100 }} alt="avatar"></img><br />
            {props.loggedUser && <div className="user-detail-container">
                <section className='user-details'>
                    <h1>{props.loggedUser.username}</h1>
                    <div className="userDetails">
                        {/* <img src={user.image ? "data:image/;base64," + props.loggedUser.profilePic.image.data : './post.png'} className="card--image" /> */}
                        <div className="card--stats">
                            <span className="gray">{props.loggedUser.username}</span>
                        </div>
                        <p className="card--title">First Name: {props.loggedUser.firstName}</p>
                        <p className="card--title">Last Name: {props.loggedUser.lastName}</p>
                        <p className="card--title">About Me: {props.loggedUser.aboutMe}</p>
                        <p className="card--title">Email: {props.loggedUser.email}</p>
                        <p className="card--title">Phone Number: {props.loggedUser.phoneNumber}</p>
                    </div>
                </section>
            </div>
            }<br />
            <input
                type="button"
                id="verifyButton"
                className="buttons"
                value="Verify Email"
                onClick={() => navigate("/verify-email")}
            /> <br />
            <input
                type="button"
                id="verifyButton"
                className="buttons"
                value="Edit Account"
                onClick={editHandler}
            /> <br />
            <input
                type="button"
                id="logoutButton"
                className="buttons"
                value="Log Out"
                onClick={() => logOutHandler('/login')}
            />
            <h1>My Posts:</h1>
            <input
                type="checkbox"
                id="saved"
                name="saved"
                checked={saved}
                onChange={handleSaved}
                className="search-box"
            /><label htmlFor="saved" style={{ color: 'black' }}> saved </label>
            {loading ?
                (<div className="spinner-container">
                    <FadeLoader
                        className="spinner-loader"
                        color="#1a2e68"
                        size={200}
                        loading={loading}
                    />
                </div>) :
                saved ?
                    <div>
                        {savedPosts}
                    </div> :
                    <div>
                        {posts}
                    </div>
            }
        </div>
    );
};

export default UserHome;

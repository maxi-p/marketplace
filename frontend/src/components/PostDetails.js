import React, { useEffect, useState } from 'react'
import buildPath from '../logic/buildPath';
import FadeLoader from 'react-spinners/FadeLoader'
import { DeletePost } from './DeletePost';
import { EditPost } from './EditPost';
import { Link } from 'react-router-dom';


const PostDetails = props => {
    const id = props.id;
    const [post, setPost] = useState({});
    const [loading, setLoading] = useState(true);
    const [hasUpdated, setHasUpdated] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    console.log(post)

    useEffect(() => {
        const getPost = async () => {
            setLoading(true)
            const json = JSON.stringify({ postId: id });
            const response = await fetch(buildPath('api/getPost'), { method: 'POST', body: json, headers: { 'Content-Type': 'application/json' } });
            var res = JSON.parse(await response.text());
            var newRes;
            if (props.loggedUser)
                newRes = {...res.post, interested: res.post.usersInterested.includes(props.loggedUser.id)};
            else
                newRes = res;
            setPost(newRes)
            setHasUpdated(false);
            // TODO: remove this mimicking network request time (0.5 seconds)
            setTimeout(() => { setLoading(false) }, 100)
        }
        getPost();
    }, [hasUpdated]);

    const interestHandler = async () => {
        console.log("userId", props.loggedUser.id, "postId", post._id)
        if (post.interested === false) {
            console.log("false")
            const json = JSON.stringify({ userId: props.loggedUser.id, postId: post._id });
            const response = await fetch(buildPath('api/interestAddition'), { method: 'POST', body: json, headers: { 'Content-Type': 'application/json' } });
            var res = JSON.parse(await response.text());
            console.log(res)
        }
        else {
            const json = JSON.stringify({ userId: props.loggedUser.id, postId: post._id });
            const response = await fetch(buildPath('api/interestDeletion'), { method: 'POST', body: json, headers: { 'Content-Type': 'application/json' } });
            var res = JSON.parse(await response.text());
            console.log(res)
        }
        setPost({...post, interested: !post.interested })
    }

    const saveHandler = data => {
        setPost(data);
    }

    const updatedHandler = data => {
        setHasUpdated(data);
    }

    const editHandler = event => {
        if (event === 'saved' || event.target.name === 'discard')
            setIsEditing(false)
        else
            setIsEditing(true)
    }

    const deleteHandler = event => {
        if (event.target.name === 'discard')
            setIsDeleting(false);
        else
            setIsDeleting(true);
    }

    return (
        <div>
            {loading ?
                (<div className="spinner-container">
                    <FadeLoader
                        className="spinner-loader"
                        color="#1a2e68"
                        size={200}
                        loading={loading}
                    />
                </div>) :
                (<div className="post-detail-container">
                    {isDeleting &&
                        <DeletePost
                            className="delete-post-popup"
                            post={post}
                            deleteHandler={deleteHandler}
                        />}
                    {isEditing &&
                        <EditPost
                            className="edit-post-popup"
                            post={post}
                            editHandler={editHandler}
                            saveHandler={saveHandler}
                            setHasUpdated={updatedHandler}
                        />}
                    <section className='post-details'>
                        <h1>{post.name}</h1>
                        <div className="card--details">
                            <div class="card--image--details">
                                <img src={post.image ? "data:image/;base64," + post.image.image.data : './post.png'} />
                            </div>
                            <div class="card--content">
                                {props.loggedUser && post.username === props.loggedUser.username &&
                                    <button
                                        className="delete--badge"
                                        name="open-delete"
                                        onClick={deleteHandler}
                                    >
                                        <img src="./delete.jpg" className="card--star" />
                                    </button>}
                                {props.loggedUser &&
                                    <button
                                        onClick={interestHandler}
                                        className="interestedButton"
                                    >
                                        <img src={post.interested ? "filled_star_p.png" : "empty_star_p.png"} className="card--star" />
                                    </button>}
                                {props.loggedUser && post.username === props.loggedUser.username &&
                                    <button
                                        className="edit--badge"
                                        name="open-edit"
                                        onClick={editHandler}
                                    >
                                        <img src="./edit.jpg" className="card--star" />
                                    </button>}

                                <div className="card--stats">
                                    <span className="gray">{post.name}</span>
                                </div>
                                <Link to={"/usr="+post.username} ><p className="card--title"> Author: {post.username}</p></Link>
                                {/* <p className="card--title">Author: {post.username}</p> */}
                                <p className="card--title">Description: {post.desc}</p>
                                <p className="card--title">Genre: {post.genre}</p>
                                <p className="card--title">Condition: {post.condition}</p>
                                <p className="card--price"><span className="bold">${post.price}</span></p>
                            </div>
                        </div>
                    </section>
                </div>)
            }
        </div>
    )
}

export default PostDetails;

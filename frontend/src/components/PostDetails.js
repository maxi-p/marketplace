import React, { useEffect, useState } from 'react'
import buildPath from '../logic/buildPath';
import FadeLoader from 'react-spinners/FadeLoader'
import { DeletePost } from './DeletePost';
import { EditPost } from './EditPost';
import { Link } from 'react-router-dom';

const PostDetails = props => {
    const id = props.id;
    const [post, setPost] = useState(null);
    const [interestedNicks, setInterestedNicks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [hasUpdated, setHasUpdated] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        const getPost = async() => {
            setLoading(true)
            const json = JSON.stringify({ postId: id});
            const response = await fetch(buildPath('api/getPost'), {method:'POST',body:json,headers:{'Content-Type': 'application/json'}});
            var res = JSON.parse(await response.text());
            var newRes;
            if (props.loggedUser)
                newRes = {...res.post, interested: res.post.usersInterested.includes(props.loggedUser.id)};
            else
                newRes = res.post;
            setPost(newRes)
            setHasUpdated(false);
            // TODO: remove this mimicking network request time (0.1 seconds)
            setTimeout(()=>{setLoading(false)}, 100)
        }
        getPost();
    }, [hasUpdated]);

    useEffect(()=>{
        const getNicks = async () => {
            if(post){
                post.usersInterested.map(async id=>{
                    const json = JSON.stringify({ userId: id, justUsername: true });
                    const response = await fetch(buildPath('api/getUser'), {method:'POST',body:json,headers:{'Content-Type': 'application/json'}});
                    var res = JSON.parse(await response.text());
                    setInterestedNicks(prev => {
                        if (!prev.includes(res.user))
                            return [...prev, res.user]
                        return prev
                    })
                });
            }
        }
        getNicks();
    },[post])

    useEffect(()=>{
        console.log("interested nicks: "+interestedNicks)
    },[interestedNicks])

    const interestHandler = async () => {
        if (post.interested === false) {
            const json = JSON.stringify({ userId: props.loggedUser.id, postId: post._id });
            const response = await fetch(buildPath('api/interestAddition'), { method: 'POST', body: json, headers: { 'Content-Type': 'application/json' } });
            var res = JSON.parse(await response.text());
        }
        else {
            const json = JSON.stringify({ userId: props.loggedUser.id, postId: post._id });
            const response = await fetch(buildPath('api/interestDeletion'), { method: 'POST', body: json, headers: { 'Content-Type': 'application/json' } });
            var res = JSON.parse(await response.text());
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
        if(event === 'saved' || event.target.name === 'discard')
            setIsEditing(false)
        else
            setIsEditing(true)
    }

    const deleteHandler = event => {
        if(event.target.name === 'discard')
            setIsDeleting(false);
        else
            setIsDeleting(true);
    }

    const interestedArr = interestedNicks.map(nick => {
        return (
            <h3>
                {nick}
            </h3>
        )
    })
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
                                {props.loggedUser && props.loggedUser.ttl === -1 && post.username === props.loggedUser.username &&
                                    <button
                                        className="delete--badge"
                                        name="open-delete"
                                        onClick={deleteHandler}
                                    >
                                        <img src="./delete.jpg" className="card--star" />
                                    </button>}
                                {props.loggedUser && props.loggedUser.ttl === -1 &&
                                    <button
                                        onClick={interestHandler}
                                        className="interestedButton"
                                    >
                                        <img src={post.interested ? "filled_star_p.png" : "empty_star_p.png"} className="card--star" />
                                    </button>}
                                {props.loggedUser && props.loggedUser.ttl === -1 && post.username === props.loggedUser.username &&
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
                        <h1>Interested Users:</h1>
                            {interestedArr}
                    </section>
                </div>)
            }
        </div>
    )
}

export default PostDetails;

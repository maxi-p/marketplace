import React from "react"
import { Link } from 'react-router-dom';

const Post = props => {
    return (
        <div className="card">
            {props.obj.username === props.loggedNick && 
            <button 
                className="delete--badge"
                onClick={() => props.openDeleteHandler(props.obj)}
            ><img src="./delete.jpg" className="card--star"/>
            </button>}
            {props.obj.username === props.loggedNick && 
            <button
                className="edit--badge"
                onClick={() => props.openEditHandler(props.obj)}
            ><img src="./edit.jpg" className="card--star" />
            </button>}
            <Link to={props.obj._id.toString()}>
            <img src={'./post.png'} className="card--image" />
            <div className="card--stats">
                <img src="./star.png" className="card--star" />
                <span className="gray"> • </span>
                <span className="gray">{props.obj.name}</span>
            </div>
            <p className="card--title">{props.obj.username}</p>
            <p className="card--price"><span className="bold">${props.obj.price}</span></p>
            <p className="card--title">{props.obj.genre}</p>
            </Link>
        </div>
    )
};

export default Post;
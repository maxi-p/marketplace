import React from "react"

const Post = props => {
    return (
        <div className="card">
            <div className="card--badge">{props.obj.genre}</div>
            <img src={'./post.png'} className="card--image" />
            <div className="card--stats">
                <img src="./star.png" className="card--star" />
                <span className="gray"> • </span>
                <span className="gray">{props.obj.name}</span>
            </div>
            <p className="card--title">{props.obj.username}</p>
            <p className="card--price"><span className="bold">${props.obj.price}</span></p>
        </div>
    )
};

export default Post;
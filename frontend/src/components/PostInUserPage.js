import React from "react"
import { Link } from 'react-router-dom';
import buildPath from '../logic/buildPath';

const PostInUserPage = props => {
    
    const interestHandler = async () => {
        console.log("userId",props.loggedUser.id,"postId",props.obj._id)
        if(props.obj.interested === false){
            console.log("false")
            const json = JSON.stringify({userId:props.loggedUser.id, postId:props.obj._id});
            const response = await fetch(buildPath('api/interestAddition'), {method:'POST',body:json,headers:{'Content-Type': 'application/json'}});
            var res = JSON.parse(await response.text());
            console.log(res)
        }
        else{
            const json = JSON.stringify({userId:props.loggedUser.id, postId:props.obj._id});
            const response = await fetch(buildPath('api/interestDeletion'), {method:'POST',body:json,headers:{'Content-Type': 'application/json'}});
            var res = JSON.parse(await response.text());
            console.log(res)
        }
        props.setOnePost({...props.obj,interested:!props.obj.interested})
    }
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
            {props.loggedUser && 
            <button
                onClick={interestHandler}
                className="interestedButton"
            >
                <img src={props.obj.interested?"filled_star_p.png":"empty_star_p.png"} className="card--star" />
            </button>}
            <Link to={"/pst="+props.obj._id.toString()} style={{ textDecoration: 'none' }}>
            <img src={props.obj.image? "data:image/;base64,"+props.obj.image.image.data:'./post.png'} className="card--image" />
            <div className="card--stats">
                
                <span className="gray"> • </span>
                <span className="gray">{props.obj.name}</span>
            </div>
            <Link to={"/usr="+props.obj.username.toString()} ><p className="card--title">{props.obj.username}</p></Link>
            <p className="card--price"><span className="bold">${props.obj.price}</span></p>
            <p className="card--title">{props.obj.genre}</p>
            </Link>
        </div>
    )
};

export default PostInUserPage;
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import buildPath from '../logic/buildPath';
import FadeLoader from 'react-spinners/FadeLoader'

export default function PostDetails(){
    const { id } = useParams();
    const [post, setPost] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getPost = async() => {
            setLoading(true)
            const json = JSON.stringify({ postId: id});
            const response = await fetch(buildPath('api/getPost'), {method:'POST',body:json,headers:{'Content-Type': 'application/json'}});
            var res = JSON.parse(await response.text());
            setPost(res.post)
            // TODO: remove this mimicking network request time (0.5 seconds)
            setTimeout(()=>{setLoading(false)}, 100)
        }
        getPost();
    },[]);

    return (
        <div>
            {loading? 
                (<div className="spinner-container">
                    <FadeLoader
                        className="spinner-loader"    
                        color="#1a2e68"
                        size={200}
                        loading={loading}
                    />
                </div>):
            
                (<section className='post-details'>
                    <h1>{post.name}</h1>
                    <div className="card">
                        <img src={'./post.png'} className="card--image" />
                        <div className="card--stats">
                            <img src="./star.png" className="card--star" />
                            <span className="gray"> • </span>
                            <span className="gray">{post.name}</span>
                        </div>
                        <p className="card--title">Author: {post.username}</p>
                        <p className="card--title">Description: {post.desc}</p>
                        <p className="card--title">Genre: {post.genre}</p>
                        <p className="card--title">Condition: {post.condition}</p>
                        <p className="card--price"><span className="bold">${post.price}</span></p>
                    </div>
                </section>)
            }
        </div>
    )
}

import React, { useEffect, useState } from 'react'
import { useParams, useLoaderData} from 'react-router-dom'
import buildPath from '../logic/buildPath';
import NavBar from './NavBar';

export default function PostDetails(){
    const { id } = useParams();
    const [post, setPost] = useState({});

    useEffect(() => {
        const getPost = async() => {
            const json = JSON.stringify({ postId: id});
            const response = await fetch(buildPath('api/getPost'), {method:'POST',body:json,headers:{'Content-Type': 'application/json'}});
            var res = JSON.parse(await response.text());
            setPost(res.post)
        }
        getPost();
    },[]);
    return (
        <div>
            <section className='post-details'>
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
            </section>
        </div>
    )
}


// app.post('/api/getPost', async(req, res, next) => {

//     const {postId} = req.body;

//     const db = client.db('oMarketDB');
//     var post = null;
//     var error = '';

//     try{
//         post = await db.collection('Posts').findOne({_id: new ObjectId(postId)});

//         if (!post)
//             throw new Error('Post was not found');
//     }
//     catch(e){
//         error = e.toString();
//     }

//     var ret = {post: post, error: error};
//     res.status(200).json(ret);
// });

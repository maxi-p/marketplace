import React, { useState, useEffect } from 'react';
import Post from './Post'
import buildPath from '../logic/buildPath';

const Products = () =>
{
    const [allPosts, setAllPosts] = useState([]);

    useEffect(() => {
        const getAllPosts = async () => {
            const json = JSON.stringify({ username:'', name:'', genre:'', searchType:'ALL' });
            const response = await fetch(buildPath('api/searchPost'), {method:'POST',body:json,headers:{'Content-Type': 'application/json'}});
            var res = JSON.parse(await response.text());
            setAllPosts(res.results)
        };
        getAllPosts();
    },[])

    const posts = allPosts.map(post => {
        return (
            <Post
                key={post._id}
                obj={post}
            />
        )
    });

    
    return(
    <div>
        <span>Posts:</span><br /><br />
        <section className="posts-list">
            {posts}
        </section>
    </div>
   );
};

export default Products;

import React from 'react';
import Post from './Post'
import { Link } from 'react-router-dom'

const Products = props =>
{
    const posts = props.allPosts.map(post => {
        return (
            <Link to={post._id.toString()} key={post._id}>
                <Post
                    obj={post}
                />
            </Link>
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

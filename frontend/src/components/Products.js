import React from 'react';
import Post from './Post';
import { Link } from 'react-router-dom';
import FadeLoader from 'react-spinners/FadeLoader'

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

    return (
        <div>
            {props.loading? 
                (<div className="spinner-container">
                    <FadeLoader
                        className="spinner-loader"    
                        color="#1a2e68"
                        size={200}
                        loading={props.loading}
                    />
                </div>):
                (<div>
                    <span>Posts:</span><br /><br />
                    <section className="posts-list">
                        {posts}
                    </section>
                </div>)
            }
        </div>)
};

export default Products;

import React, {useState} from 'react';
import Post from './Post';
import FadeLoader from 'react-spinners/FadeLoader'
import { DeletePostFromHome } from './DeletePostFromHome';
import { EditPostFromHome } from './EditPostFromHome';

const Products = props =>
{
    const [isEditing, setIsEditing] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [post, setPost] = useState({});

    const openEditHandler = data => {
        setPost(data);
        setIsEditing(true);
    }

    const openDeleteHandler = data => {
        setPost(data);
        setIsDeleting(true);
    }

    const closeEditHandler = event => {
        setIsEditing(false);
    }

    const closeDeleteHandler = event => {
        setIsDeleting(false);
    }
    const posts = props.allPosts.map(post => {
        return (
            <Post
                loggedUser={props.loggedUser}
                setOnePost={props.setOnePost}
                key={post._id}
                obj={post}
                openEditHandler={openEditHandler}
                openDeleteHandler={openDeleteHandler}
            />
        )
    });
    const savedPosts = props.allPosts.map(post => {
        if (post.interested)
        return (
            <Post
                loggedUser={props.loggedUser}
                setOnePost={props.setOnePost}
                key={post._id}
                obj={post}
                openEditHandler={openEditHandler}
                openDeleteHandler={openDeleteHandler}
            />
        )
    });

    return (
        <div className='products-section'>
            {props.loading? 
                (<div className="spinner-container">
                    <FadeLoader
                        className="spinner-loader"    
                        color="#1a2e68"
                        size={200}
                        loading={props.loading}
                    />
                </div>): 
                (<div className="post-detail-container">
                    {isDeleting &&
                    <DeletePostFromHome 
                        className="delete-post-popup"
                        post={post}
                        closeDeleteHandler={closeDeleteHandler}
                        setOnePost={props.setOnePost}
                    />}
                    {isEditing && 
                    <EditPostFromHome 
                        className="edit-post-popup"
                        post={post}
                        closeEditHandler={closeEditHandler}
                        setOnePostFetch={props.setOnePostFetch}
                    />}
                    <br /><br />
                    {props.saved?
                    (<section className="posts-list">
                        {savedPosts}
                    </section>):
                    (<section className="posts-list">
                        {posts}
                    </section>)}
                </div>)
            }
        </div>)
};

export default Products;

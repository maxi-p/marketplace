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
    console.log("posts", props.allPosts)
    const posts = props.allPosts.map(post => {
        return (
            <Post
                loggedNick={props.loggedUser? props.loggedUser.username : ''}
                key={post._id}
                obj={post}
                openEditHandler={openEditHandler}
                openDeleteHandler={openDeleteHandler}
            />
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
                (<div className="post-detail-container">
                    {isDeleting &&
                    <DeletePostFromHome 
                        className="delete-post-popup"
                        post={post}
                        closeDeleteHandler={closeDeleteHandler}
                        setAllPosts={props.setAllPosts}
                        allPosts={props.allPosts}
                    />}
                    {isEditing && 
                    <EditPostFromHome 
                        className="edit-post-popup"
                        post={post}
                        closeEditHandler={closeEditHandler}
                        setAllPosts={props.setAllPosts}
                        allPosts={props.allPosts}
                        setModified={props.setModified}
                    />}
                    {/* <span>Posts:</span> */}
                    <br /><br />
                    <section className="posts-list">
                        {posts}
                    </section>
                </div>)
            }
        </div>)
};

export default Products;

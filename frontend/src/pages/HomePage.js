import React, {useState} from 'react';
import PageTitle from '../components/PageTitle';
import Products from '../components/Products';
import SearchBar from '../components/SearchBar';
import isLoggedIn from '../logic/isLoggedIn';

const HomePage = props =>
{
    // const [user] = useState(isLoggedIn());
    const [modified, setModified] = useState(false)
    const [allPosts, setAllPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    const postHandler = data => {
        setAllPosts(data)
    }

    const loadingHandler = data => {
        setLoading(data);
    }

    const modifiedHandler = data =>{
        setModified(data);
    }

    return(
        <div>
            <PageTitle title="Open Market"/>
            {/* {user && <span>Logged in as: {user.firstName} {user.lastName}</span>} */}
            <SearchBar setLoading={loadingHandler} setAllPosts={postHandler} modified={modified} setModified={modifiedHandler}/>
            <Products loggedUser={props.loggedUser} loading={loading} allPosts={allPosts} setAllPosts={postHandler} setModified={modifiedHandler}/>
        </div>
    );
}

export default HomePage;

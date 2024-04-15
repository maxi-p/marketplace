import React, {useState} from 'react';
import PageTitle from '../components/PageTitle';
import Products from '../components/Products';
import SearchBar from '../components/SearchBar';
import useSearch from '../hooks/useSearch';

const HomePage = props =>
{
    // const [user] = useState(isLoggedIn());
    const [modified, setModified] = useState(false);
    const [saved, setSaved] = useState(false);
    const [loading, setLoading] = useState(true);
    const loadingHandler = data => {
        setLoading(data);
    }
    const {allPosts, setAllPosts, setOnePost, setOnePostFetch} = useSearch(loadingHandler,{username: '',name: '',genre: ''},props.loggedUser);

    const postHandler = data => {
        setAllPosts(data)
    }

    const handleSaved = event =>{
        setSaved(event.target.checked)
    }

    const modifiedHandler = data =>{
        setModified(data);
    }

    return(
        <div>
            <PageTitle title="Open Market"/>
            {/* {user && <span>Logged in as: {user.firstName} {user.lastName}</span>} */}
            <SearchBar setLoading={loadingHandler} setAllPosts={postHandler} modified={modified} setModified={modifiedHandler} saved={saved} setSaved={handleSaved}/>
            <Products loggedUser={props.loggedUser} loading={loading} allPosts={allPosts} setAllPosts={postHandler} setModified={modifiedHandler} saved={saved} setOnePost={setOnePost} setOnePostFetch={setOnePostFetch}/>
        </div>
    );
}

export default HomePage;

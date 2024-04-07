import React, {useState} from 'react';
import PageTitle from '../components/PageTitle';
import Products from '../components/Products';
import SearchBar from '../components/SearchBar';
import isLoggedIn from '../logic/isLoggedIn';
const HomePage = () =>
{
    const [user] = useState(isLoggedIn());
    const [allPosts, setAllPosts] = useState([]);

    const handler = data => {
        setAllPosts(data)
      }

    return(
        <div>
            <PageTitle title="Open Market"/>{user && <span>Logged in as: {user.firstName} {user.lastName}</span>}
            <SearchBar setAllPosts={handler}/>
            <Products allPosts={allPosts}/>
        </div>
    );
}

export default HomePage;

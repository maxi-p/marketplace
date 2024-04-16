import React, { useState, useEffect } from 'react';
import buildPath from '../logic/buildPath';

export default function useSearch(setLoading, init, loggedUser) {
    const [allPosts, setAllPosts] = useState([]);
    const [request, setRequest] = useState(init);
    var loadingFunction = setLoading;

    useEffect(() => {
        const getAllPosts = async () => {
            loadingFunction(true)
            const json = JSON.stringify(request);
            const response = await fetch(buildPath('api/searchPost'), { method: 'POST', body: json, headers: { 'Content-Type': 'application/json' } });
            var res = JSON.parse(await response.text());
            var arr = res.results;
            arr = arr.map(element => {
                if (loggedUser)
                    return { ...element, interested: element.usersInterested.includes(loggedUser.id) }
                else
                    return element;
            });
            console.log('array', arr)
            loadingFunction(false)
            setAllPosts(arr)
        }
        getAllPosts();
    }, [request])


    const getPosts = (request) => {
        setRequest(request);
    };

    const setOnePostHandler = data => {
        var newPosts = [];
        allPosts.map(post => {
            if (post._id === data._id) {
                console.log("post: ", post, " data: ", data);
                if (!data.delete)
                    newPosts.push(data)
            }
            else {
                newPosts.push(post)
            }
        })
        setAllPosts(newPosts);
    };

    return {
        setAllPosts: getPosts,
        setOnePost: setOnePostHandler,
        allPosts
    }
}
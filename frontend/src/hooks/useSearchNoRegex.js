import React, { useState, useEffect } from 'react';
import buildPath from '../logic/buildPath';

export default function useSearch(setLoading, init,loggedUser){
    const [allPosts, setAllPosts] = useState([]);
    const [request, setRequest] = useState(init);
    var loadingFunction = setLoading;

    useEffect(()=>{
        const getAllPosts = async () => {
            loadingFunction(true)
            const json = JSON.stringify(request);
            const response = await fetch(buildPath('api/noRegexSearchPost'), {method:'POST',body:json,headers:{'Content-Type': 'application/json'}});
            var res = JSON.parse(await response.text());
            if(res.error === ''){
                var arr = res.results;
                arr = arr.map(element=>{
                    if(loggedUser)
                        return {...element, interested: element.usersInterested.includes(loggedUser.id)}
                    else
                        return element;
                });
                console.log('array',arr)
                loadingFunction(false)
                setAllPosts(arr)
            }
            else{
                console.log(res.error)
            }
        }
        getAllPosts();
    },[request])
  
  
    const getPosts = (request) => {
        setRequest(request);
    };

    const setOnePostHandler = data => {
        var newPosts = [];
        allPosts.map(post => {
            if(post._id === data._id){
                if(!data.delete) // deleting post from home or from userhome
                    newPosts.push(data)
            }
            else{
                newPosts.push(post)
            }
        })
        setAllPosts(newPosts);
    };
    const setFetchHandler = async data => {
        console.log("fetch request")
        var newPosts = [];
        const json = JSON.stringify(data);
        const response = await fetch(buildPath('api/getPost'), {method:'POST',body:json,headers:{'Content-Type': 'application/json'}});
        var res = JSON.parse(await response.text());
        if(res.error === ''){
            const returnedPost = res.post;
            allPosts.map(post => {
                if(post._id === returnedPost._id){
                    newPosts.push({...returnedPost, interested:post.interested})
                }
                else{
                    newPosts.push(post)
                }
            });
            setAllPosts(newPosts)
        }
        else{
            console.log(res.error);
        }
        console.log("return: ",res.post)
        console.log("example: ", allPosts[1])
    }
  
    return {
      setAllPosts: getPosts,
      setOnePost: setOnePostHandler,
      setOnePostFetch: setFetchHandler,
      allPosts
    }
  }
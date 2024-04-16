import { useState } from 'react';

export default function useLoggedUser() {
  const getLoggedUser = () => {
    return JSON.parse(localStorage.getItem('user_data'));
  };

  const [loggedUser, setLoggedUser] = useState(getLoggedUser());

  const saveLoggedUser = data => {
    if(data == null){
      localStorage.removeItem('user_data');
    }
    else{
      localStorage.setItem('user_data', JSON.stringify(data));
    }
    setLoggedUser(data);
  };

  const setTTL = data => {
    const newUser = {...loggedUser, ttl: data}
    localStorage.setItem('user_data', JSON.stringify(newUser));
    setLoggedUser(newUser);
  }

  return {
    setUpdatedTTL: setTTL,
    setLoggedUser: saveLoggedUser,
    loggedUser
  }
}
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

  return {
    setLoggedUser: saveLoggedUser,
    loggedUser
  }
}
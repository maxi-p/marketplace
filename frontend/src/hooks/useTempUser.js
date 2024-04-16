import { useState } from 'react';

export default function useTempUser() {
  const getTempUser = () => {
    return JSON.parse(localStorage.getItem('temp_data'));
  };

  const [tempUser, setTempUser] = useState(getTempUser());

  const saveTempUser = data => {
    if(data == null){
      localStorage.removeItem('temp_data');
    }
    else{
      localStorage.setItem('temp_data', JSON.stringify(data));
    }
    setTempUser(data);
  };

  return {
    setTempUser: saveTempUser,
    tempUser
  }
}
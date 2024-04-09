import { createContext, useState } from 'react';

export const UserContext = createContext({
    id: null,
    username: null,
});

export const UserProvider = ({ children }) => {
    const [id, setId] = useState(null);
    const [username, setUsernameState] = useState(null);

    const setUsername = (newUsername) => {
        setUsernameState(newUsername);
      };

    return (
        <UserContext.Provider value={{ id, username, setId, setUsername }}>
            {children}
        </UserContext.Provider>
    );
};
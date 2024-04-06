import { createContext } from 'react';

export const UserContext = createContext({
    id: null,
    username: null,
    firstname: null,
    lastname: null,
    email: null,
    phoneNumber: null,
    aboutme: null,
    setId: () => {},
    setUsername: () => {},
    setFirstName: () => {},
    setLastName: () => {},
    setEmail: () => {},
    setPhoneNumber: () => {},
    setAboutMe: () => {},
});

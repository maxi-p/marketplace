import {createContext} from 'react';

export const UserContext = createContext({
  user: {
    id: null,
    firstName: null,
    lastName: null,
    username: null,
    email: null,
  },
  setUser: () => {},
});

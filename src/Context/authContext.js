import React, { useState, createContext, useEffect } from 'react';
import { fb } from '../Firebase/firebase';

export const authContext = createContext();

export const AuthProvider = (props) => {
  const [loggedIn, setLoggedIn] = useState(false);


  useEffect(() => {
    fb.auth().onAuthStateChanged(user => {
      if (user) {
        setLoggedIn(true);
      } else {
        setLoggedIn(false);
      };
    });
  }, []);

  return (
    <authContext.Provider value={[loggedIn, setLoggedIn]}>
      {props.children}
    </authContext.Provider>
  )
}
import React, { useState, createContext, useEffect, useContext } from 'react';
import { fb } from '../Firebase/firebase';

export const authContext = createContext();

export const AuthProvider = (props) => {
  const [loggedIn, setLoggedIn] = useState({ status: false, user: null });



  useEffect(() => {
    fb.auth().onAuthStateChanged(user => {
      if (user) {
        setLoggedIn({
          status: true,
          user: user
        });
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
import React, { useContext, useReducer } from 'react';
import { fb } from '../../Firebase/firebase';
import { authContext } from '../../Context/authContext';
import Navbar from '../../Components/Navigation/Navbar';
import classes from './Profile.module.css';

const Profile = (props) => {
  const [loggedIn] = useContext(authContext)

  let userEmail = null
  if (loggedIn.user != null) {
    userEmail = loggedIn.user.email
  }
  console.log('[Profile] render')
  return (
    <div className={classes.profile}>
      <Navbar />
      <p>User Profile</p>
      <h1>{userEmail}</h1>
    </div>

  );
}

export default Profile;
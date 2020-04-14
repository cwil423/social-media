import React, { useContext, useReducer, useState, forceUpdate } from 'react';
import { fb } from '../../Firebase/firebase';
import { authContext } from '../../Context/authContext';
import Navbar from '../../Components/Navigation/Navbar';
import classes from './Profile.module.css';
import ProfileEditor from './ProfileEditor/ProfileEditor';

const Profile = (props) => {
  const [loggedIn] = useContext(authContext)
  const [editingProfile, setEditingProfile] = useState(false)
  const [userName, setUserName] = useState('')

  const submitNameHandler = (userName) => {
    fb.auth().currentUser.updateProfile({
      displayName: userName
    });
    setTimeout(() => { setEditingProfile(!editingProfile) }, 800);
  }

  let userEmail = null
  if (loggedIn.user != null) {
    if (loggedIn.user.displayName === null) {
      userEmail = 'Please enter a username!'
    } else {
      userEmail = loggedIn.user.displayName
    }
  }


  console.log('[Profile] render')
  return (
    <div className={classes.profile}>
      <Navbar />
      <p>User Name: </p>
      <h1>{userEmail}</h1>
      <p>User Photo:</p>
      {editingProfile ? <ProfileEditor submitName={(userName) => submitNameHandler(userName)} /> : null}
      <button onClick={() => setEditingProfile(!editingProfile)}>Update Account</button>
    </div>

  );
}

export default Profile;
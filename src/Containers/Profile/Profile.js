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

  const submitPhotoHandler = (photo) => {
    fb.auth().currentUser.updateProfile({
      photoURL: photo
    });
    setTimeout(() => { setEditingProfile(!editingProfile) }, 800);
  }

  let displayName = null
  if (loggedIn.user != null) {
    if (loggedIn.user.displayName === null) {
      displayName = 'Please enter a username!'
    } else {
      displayName = loggedIn.user.displayName
    }
  }

  let userPhoto = null
  if (loggedIn.user != null) {
    console.log(loggedIn.user.photoURL)
    if (loggedIn.user.photoURL === null) {
      userPhoto = <h1>Please select a user photo!</h1>
    } else {
      userPhoto = <img className={classes.userPhoto} src={loggedIn.user.photoURL} alt='Please select a user photo' />
    }

  }

  console.log('[Profile] render')
  return (
    <div className={classes.profile}>
      <Navbar />
      <p>User Name: </p>
      <h1>{displayName}</h1>
      <p>User Photo:</p>
      {userPhoto}
      {editingProfile ? <ProfileEditor submitName={(userName) => submitNameHandler(userName)} submitPhoto={(photo) => submitPhotoHandler(photo)} /> : null}
      <button onClick={() => setEditingProfile(!editingProfile)}>Update Account</button>
    </div>

  );
}

export default Profile;
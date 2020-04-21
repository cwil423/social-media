import React, { useContext, useReducer, useState, forceUpdate } from 'react';
import { fb } from '../../Firebase/firebase';
import { authContext } from '../../Context/authContext';
import Navbar from '../../Components/Navigation/Navbar/Navbar';
import classes from './Profile.module.css';
import PhotoEditor from './PhotoEditor/PhotoEditor';
import NameEditor from './NameEditor/NameEditor';
import Button from '../../Components/UI/Button/Button';
import ProfileEditor from './ProfileEditor';

const Profile = (props) => {
  const [loggedIn] = useContext(authContext);
  const [editingName, setEditingName] = useState(false);
  const [editingPhoto, setEditingPhoto] = useState(false);

  const submitNameHandler = (userName) => {
    fb.auth().currentUser.updateProfile({
      displayName: userName
    });
    setTimeout(() => { setEditingName(!editingName) }, 800);
  }

  const submitPhotoHandler = (photo) => {
    fb.auth().currentUser.updateProfile({
      photoURL: photo
    });
    setTimeout(() => { setEditingPhoto(!editingPhoto) }, 800);
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
      <h1>{displayName}</h1>
      {editingName ? <NameEditor submitName={(name) => submitNameHandler(name)} /> : null}
      <Button onClick={() => setEditingName(!editingName)}>Update Name</Button>
      {userPhoto}
      {editingPhoto ? <PhotoEditor submitPhoto={(photo) => submitPhotoHandler(photo)} /> : null}
      <Button onClick={() => setEditingPhoto(!editingPhoto)}>Update Photo</Button>
    </div>

  );
}

export default Profile;

{/* <h1>{displayName}</h1>
{editingName ? <NameEditor submitName={(userName) => submitNameHandler(userName)} /> : null}
<Button onClick={() => setEditingName(!editingName)}>Update Name</Button>
{userPhoto}
{editingPhoto ? <PhotoEditor submitPhoto={(photo) => submitPhotoHandler(photo)} /> : null}
<Button onClick={() => setEditingPhoto(!editingPhoto)}>Update Photo</Button> */}
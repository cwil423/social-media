import React, { useContext, useState } from 'react';
import { fb } from '../../Firebase/firebase';
import { authContext } from '../../Context/authContext';
import Navbar from '../../Components/Navigation/Navbar/Navbar';
import classes from './Profile.module.css';
import PhotoEditor from './PhotoEditor/PhotoEditor';
import NameEditor from './NameEditor/NameEditor';
import Button from '../../Components/UI/Button/Button';
import Posts from '../../Components/Posts/Posts';
import Spinner from '../../Components/UI/Spinner/Spinner';

const Profile = (props) => {
  const [loggedIn] = useContext(authContext);
  const [editingName, setEditingName] = useState(false);
  const [editingPhoto, setEditingPhoto] = useState(false);
  const [posts, setPosts] = useState(null)
  const [loading, setLoading] = useState(true)

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

  const onDeleteHandler = (postId) => {
    fb.firestore().collection('posts').doc(postId).delete()
      .then(() => {
        let fetchedPosts = [];
        fb.firestore().collection('posts').where('uid', '==', loggedIn.user.uid).orderBy('date', 'desc').get()
          .then(querySnapshot => {
            querySnapshot.forEach((doc) => {
              let postContent = doc.data()
              postContent.postId = doc.id
              fetchedPosts.push(postContent)
            })
            setPosts(fetchedPosts)
          });
      })

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

  if (loggedIn.user != null && posts === null) {
    let fetchedPosts = [];
    fb.firestore().collection('posts').where('uid', '==', loggedIn.user.uid).orderBy('date', 'desc').get()
      .then(querySnapshot => {
        querySnapshot.forEach((doc) => {
          let postContent = doc.data()
          postContent.postId = doc.id
          fetchedPosts.push(postContent)
        })
        setPosts(fetchedPosts)
        setLoading(false)

      });
  }

  let displayedPosts = null
  if (posts != null) {
    displayedPosts = (
      <Posts
        posts={posts}
        deletable={true}
        delete={(postId) => onDeleteHandler(postId)}
      />
    )
  }

  let page = <Spinner />
  if (loading === false) {
    page = (
      <div className={classes.profile}>
        <div className={classes.profileSection}>
          <h1>{displayName}</h1>
          {editingName ? <NameEditor submitName={(name) => submitNameHandler(name)} /> : null}
          <Button onClick={() => setEditingName(!editingName)}>Update Name</Button>
          {userPhoto}
          {editingPhoto ? <PhotoEditor submitPhoto={(photo) => submitPhotoHandler(photo)} /> : null}
          <Button onClick={() => setEditingPhoto(!editingPhoto)}>Update Photo</Button>
        </div>
        <div className={classes.posts}>
          {displayedPosts}
        </div>
      </div>
    )
  }

  console.log('[Profile] render')
  return (
    <React.Fragment>
      <Navbar />
      {page}
    </React.Fragment>


  );
}

export default Profile;

import React, { useContext, useState } from 'react';
import { fb } from '../../Firebase/firebase';
import { Button, Card, TextField, Typography } from '@material-ui/core';
import { authContext } from '../../Context/authContext';
import Navbar from '../../Components/Navigation/Navbar/Navbar';
import SideMenu from '../../Components/Navigation/SideMenu';
import classes from './Profile.module.css';
import PhotoEditor from './PhotoEditor/PhotoEditor';
import NameEditor from './NameEditor/NameEditor';
import Posts from '../../Components/Posts/Posts';
import Spinner from '../../Components/UI/Spinner/Spinner';
import PageHeader from '../../Components/Navigation/pageHeader';
import Modal from '../../Components/UI/Modal/Modal';

const Profile = (props) => {
  const [loggedIn] = useContext(authContext);
  const [editingPhoto, setEditingPhoto] = useState(false);
  const [posts, setPosts] = useState(null);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [photo, setPhoto] = useState();

  const submitPhotoHandler = (photo) => {
    fb.auth().currentUser.updateProfile({
      photoURL: photo,
    });
    setTimeout(() => {
      setEditingPhoto(!editingPhoto);
    }, 800);
  };

  const onDeleteHandler = (postId) => {
    fb.firestore()
      .collection('posts')
      .doc(postId)
      .delete()
      .then(() => {
        let fetchedPosts = [];
        fb.firestore()
          .collection('posts')
          .where('uid', '==', loggedIn.user.uid)
          .orderBy('date', 'desc')
          .get()
          .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              let postContent = doc.data();
              postContent.postId = doc.id;
              fetchedPosts.push(postContent);
            });
            setPosts(fetchedPosts);
          });
      });
  };

  let userPhoto = null;
  if (loggedIn.user != null) {
    if (loggedIn.user.photoURL === null) {
      userPhoto = <h1>Please select a user photo!</h1>;
    } else {
      userPhoto = (
        <img
          className={classes.userPhoto}
          src={loggedIn.user.photoURL}
          alt="Please select a user photo"
        />
      );
    }
  }

  if (loggedIn.user != null && posts === null) {
    let fetchedPosts = [];
    fb.firestore()
      .collection('posts')
      .where('uid', '==', loggedIn.user.uid)
      .orderBy('date', 'desc')
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          let postContent = doc.data();
          postContent.postId = doc.id;
          fetchedPosts.push(postContent);
        });
        setPosts(fetchedPosts);
        setLoading(false);
      });
  }

  let displayedPosts = (
    <Card className={classes.placeholder}>
      <Typography variant="h6">
        Create posts to see them displayed here!
      </Typography>
    </Card>
  );
  if (posts != null) {
    if (posts.length > 0) {
      displayedPosts = (
        <Posts
          posts={posts}
          deletable={true}
          onDelete={(postId) => onDeleteHandler(postId)}
          modal={() => setModalOpen(!modalOpen)}
        />
      );
    }
  }

  let page = <Spinner />;
  if (loading === false) {
    page = (
      <div className={classes.profile}>
        <div className={classes.profileSection}>
          <h1>{loggedIn.user.displayName}</h1>

          {userPhoto}
          {editingPhoto ? (
            <div className={classes.photoURL}>
              <TextField
                // variant="outlined"
                placeholder="New photo URL"
                onChange={(e) => setPhoto(e.target.value)}
              />
              <Button
                variant="contained"
                color="primary"
                onClick={() => submitPhotoHandler(photo)}
              >
                Submit
              </Button>
            </div>
          ) : null}
          {!editingPhoto ? (
            <div>
              <Button
                variant="contained"
                color="primary"
                onClick={() => setEditingPhoto(!editingPhoto)}
              >
                Update Photo
              </Button>
            </div>
          ) : null}
        </div>
        <div className={classes.posts}>{displayedPosts}</div>
      </div>
    );
  }

  console.log('[Profile] render');
  return (
    <div className={classes.profilePage}>
      <PageHeader title="Profile" />
      <Navbar />
      <SideMenu />
      <Modal open={modalOpen} />
      {page}
    </div>
  );
};

export default Profile;

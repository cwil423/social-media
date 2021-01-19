import React, { useState, useEffect, useContext } from 'react';
import SideMenu from '../Navigation/SideMenu';
import Navbar from '../Navigation/Navbar/Navbar';
import { useSelector } from 'react-redux';
import { fb } from '../../Firebase/firebase';
import Posts from '../Posts/Posts';
import classes from './OtherProfile.module.css';
import { useHistory } from 'react-router-dom';
import { authContext } from '../../Context/authContext';
import PageHeader from '../Navigation/pageHeader';

const OtherProfile = () => {
  const [posts, setPosts] = useState(null);
  const [noUserMessage, setNoUserMessage] = useState();
  const [loggedIn] = useContext(authContext);

  const user = useSelector((state) => state);

  let history = useHistory();
  let fetchedPosts = [];

  useEffect(() => {
    if (user != null) {
      if (loggedIn.user.uid === user.selectedUser) {
        history.push('/profile');
      }
    }
  });

  useEffect(() => {
    if (loggedIn != null) {
      if (user == null) {
        setNoUserMessage('No user selected');
      }
    }
  });

  useEffect(() => {
    if (user != null && posts === null)
      fb.firestore()
        .collection('posts')
        .where('uid', '==', user.selectedUser)
        .orderBy('date', 'desc')
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            let postContent = doc.data();
            postContent.postId = doc.id;
            fetchedPosts.push(postContent);
          });
          setPosts(fetchedPosts);
          setNoUserMessage(true);
        });
  });

  let userName = null;
  if (user != null) {
    userName = <h1>{user.selectedUserName}</h1>;
  }

  let userPhoto = null;
  if (user != null) {
    userPhoto = (
      <img
        className={classes.userPhoto}
        src={user.selectedUserPhoto}
        alt="Please select a user photo"
      />
    );
  }

  let displayedPosts = null;
  if (posts != null) {
    displayedPosts = <Posts posts={posts} />;
  }

  return (
    <div className={classes.otherProfile}>
      {/* <Navbar /> */}
      <SideMenu />
      <PageHeader title="Profile" />
      <div className={classes.profile}>
        <div className={classes.profileSection}>
          {userName}
          {userPhoto}
          {noUserMessage}
        </div>
        <div className={classes.posts}>{displayedPosts}</div>
      </div>
    </div>
  );
};

export default OtherProfile;

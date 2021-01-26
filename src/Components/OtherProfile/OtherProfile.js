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
    if (user != null && posts === null) {
      if (loggedIn.status) {
        let fetchedPosts = [];
        let fetchedLikes = [];
        const getData = async () => {
          await fb
            .firestore()
            .collection('posts')
            .where('uid', '==', user.selectedUser)
            .orderBy('date', 'desc')
            .get()
            .then((querySnapshot) => {
              querySnapshot.forEach((doc) => {
                let data = doc.data();
                data.id = doc.id;
                fetchedPosts.push(data);
              });
            });
          await fb
            .firestore()
            .collection('likes')
            .get()
            .then((querySnapshot) => {
              querySnapshot.forEach((doc) => {
                fetchedLikes.push({ id: doc.id, data: doc.data() });
              });
              fetchedPosts.forEach((post) => {
                post.liked = false;
                post.like = null;
                fetchedLikes.forEach((like) => {
                  if (
                    like.data.postId === post.postId &&
                    like.data.uid === loggedIn.user.uid
                  ) {
                    post.liked = true;
                    post.like = like.id;
                  }
                });
              });
              setPosts(fetchedPosts);
            });
        };
        getData();
        // setLoading(false);
      }
    }
  }, [loggedIn]);

  const onLikeHandler = async (info) => {
    console.log(info);
    if (info.liked) {
      try {
        await fb.firestore().collection('likes').doc(info.like).delete();
        let updatedPosts = [...posts];
        updatedPosts.forEach((post) => {
          if (info.postId === post.postId) {
            post.liked = false;
          }
        });
        setPosts(updatedPosts);
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        await fb
          .firestore()
          .collection('likes')
          .add({
            postId: info.postId,
            uid: loggedIn.user.uid,
            user: loggedIn.user.displayName,
          })
          .then((docRef) => {
            let updatedPosts = [...posts];
            updatedPosts.forEach((post) => {
              if (info.postId === post.postId) {
                post.liked = true;
                post.like = docRef.id;
                post.likes += 1;
              }
            });
            setPosts(updatedPosts);
          });
        // await fb.firestore().collection().doc()
      } catch (error) {
        console.log(error);
      }
    }
  };

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
    displayedPosts = <Posts posts={posts} onLike={onLikeHandler} />;
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

import React, { useState, useEffect, useContext } from 'react';
import Posts from '../../Components/Posts/Posts';
import Navbar from '../../Components/Navigation/Navbar/Navbar';
import classes from './HomePage.module.css';
import { fb } from '../../Firebase/firebase';
import CreatePost from '../CreatePost/CreatePost';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Spinner from '../../Components/UI/Spinner/Spinner';
import SideMenu from '../../Components/Navigation/SideMenu';
import PageHeader from '../../Components/Navigation/pageHeader';
import { Button } from '@material-ui/core';
import { authContext } from '../../Context/authContext';

const HomePage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loggedIn] = useContext(authContext);
  const dispatch = useDispatch();

  let history = useHistory();

  useEffect(() => {
    if (loggedIn.status) {
      let fetchedPosts = [];
      let fetchedLikes = [];
      const getData = async () => {
        await fb
          .firestore()
          .collection('posts')
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
      setLoading(false);
    }
  }, [loggedIn]);

  const onClickHandler = (uid, photo, user) => {
    dispatch({ type: 'postClicked', uid: uid, photo: photo, user: user });
    history.push('/user');
  };

  const onLikeHandler = async (info) => {
    if (info.liked) {
      try {
        await fb
          .firestore()
          .collection('posts')
          .doc(info.id)
          .update({
            likes: info.likes - 1,
          });
        await fb.firestore().collection('likes').doc(info.like).delete();
        let updatedPosts = [...posts];
        updatedPosts.forEach((post) => {
          if (info.postId === post.postId) {
            post.liked = false;
            post.likes -= 1;
          }
        });
        setPosts(updatedPosts);

        console.log('removed like');
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        await fb
          .firestore()
          .collection('posts')
          .doc(info.id)
          .update({
            likes: info.likes + 1,
          });
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

        console.log('removed like');
      } catch (error) {
        console.log(error);
      }
    }
  };

  let spinner = <Spinner />;
  if (loading === false) {
    spinner = null;
  }
  console.log('[Homepage] render');
  return (
    <div className={classes.homepage}>
      <SideMenu />
      <Navbar />
      <PageHeader title="Home Page" />
      <div className={classes.posts}>
        {spinner}
        <Posts
          posts={posts}
          onLike={onLikeHandler}
          clickable={true}
          clicked={(uid, photo, user) => onClickHandler(uid, photo, user)}
        />
      </div>
    </div>
  );
};

export default HomePage;

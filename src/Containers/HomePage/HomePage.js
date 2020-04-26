import React, { useState, useEffect } from 'react';
import Posts from '../../Components/Posts/Posts';
import Navbar from '../../Components/Navigation/Navbar/Navbar';
import classes from './HomePage.module.css';
import { fb } from '../../Firebase/firebase';
import CreatePost from '../CreatePost/CreatePost';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

const HomePage = () => {
  const [posts, setPosts] = useState([])
  const dispatch = useDispatch()

  let history = useHistory()


  useEffect(() => {
    let fetchedPosts = [];
    fb.firestore().collection('posts').orderBy('date', 'desc').get()
      .then(querySnapshot => {
        querySnapshot.forEach((doc) => {
          fetchedPosts.push(doc.data())
        })
        setPosts(fetchedPosts)
      });
  }, []);

  const onClickHandler = (uid, photo, user) => {
    dispatch({ type: 'postClicked', uid: uid, photo: photo, user: user });
    history.push('/user')
  }

  console.log('[Homepage] render')
  return (
    <React.Fragment>
      <Navbar />
      <div className={classes.homepage}>
        <Posts
          posts={posts}
          clickable={true}
          clicked={(uid, photo, user) => onClickHandler(uid, photo, user)} />
      </div>
    </React.Fragment>

  );
}

export default HomePage;
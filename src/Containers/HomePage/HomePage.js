import React, { useState, useEffect } from 'react';
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

const HomePage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  let history = useHistory();

  useEffect(() => {
    let fetchedPosts = [];
    fb.firestore()
      .collection('posts')
      .orderBy('date', 'desc')
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          fetchedPosts.push(doc.data());
        });
        setPosts(fetchedPosts);
        setLoading(false);
      });
  }, []);

  const onClickHandler = (uid, photo, user) => {
    dispatch({ type: 'postClicked', uid: uid, photo: photo, user: user });
    history.push('/user');
  };

  let spinner = <Spinner />;
  if (loading === false) {
    spinner = null;
  }
  console.log('[Homepage] render');
  return (
    <div className={classes.homepage}>
      <SideMenu />
      <PageHeader title="Home Page" />
      <div className={classes.posts}>
        {spinner}
        <Posts
          posts={posts}
          clickable={true}
          clicked={(uid, photo, user) => onClickHandler(uid, photo, user)}
        />
      </div>
    </div>
  );
};

export default HomePage;

import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import Posts from '../../Components/Posts/Posts';
import Navbar from '../../Components/Navigation/Navbar';
import classes from './HomePage.module.css';
import { fb } from '../../Firebase/firebase';
import { useSelector } from 'react-redux';

const HomePage = () => {
  const [posts, setPosts] = useState([])


  // Need to change to avoid rerender on each post.
  useEffect(() => {
    fb.firestore().collection('posts').orderBy('date', 'desc').get()
      .then(querySnapshot => {
        querySnapshot.forEach((doc) => {
          setPosts((prevPosts => prevPosts.concat(doc.data())))
        })
      });
  }, []);
  console.log('[Homepage] render')
  return (
    <div className={classes.homepage}>
      <Navbar />
      <Posts posts={posts} />
    </div>
  );
}

export default HomePage;
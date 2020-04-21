import React, { useState, useEffect, useContext } from 'react';
import Posts from '../../Components/Posts/Posts';
import Navbar from '../../Components/Navigation/Navbar/Navbar';
import Button from '../../Components/UI/Button/Button';
import classes from './HomePage.module.css';
import { fb } from '../../Firebase/firebase';
import CreatePost from '../CreatePost/CreatePost';

const HomePage = () => {
  const [posts, setPosts] = useState([])


  // Need to change to avoid rerender on each post.
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

  console.log('[Homepage] render')
  return (
    <div className={classes.homepage}>
      <Navbar />
      <Posts posts={posts} />
    </div>
  );
}

export default HomePage;
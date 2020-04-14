import React, { useState, useContext } from 'react';
import axios from 'axios';
import Navbar from '../../Components/Navigation/Navbar';
import classes from './CreatePost.module.css';
import { fb } from '../../Firebase/firebase';
import { useHistory } from 'react-router-dom';
import { authContext } from '../../Context/authContext';

const CreatePost = () => {
  // const [postTitle, setPostTitle] = useState('')
  const [postContent, setPostContent] = useState('')
  const [loggedIn] = useContext(authContext);

  let history = useHistory()

  const submitPostHandler = (post, user) => {
    let content = { post, user }
    fb.firestore().collection('posts').add(content)
    history.push('/home_page')
  }
  console.log('[Create Post] render')
  return (
    <div className={classes.createPost}>
      <Navbar />
      Please create a post.
      {/* <input
        value={postTitle}
        onChange={event => setPostTitle(event.target.value)}
        placeholder='Title' /> */}
      <input
        value={postContent}
        onChange={event => setPostContent(event.target.value)}
        placeholder='Content' />
      <button onClick={() => submitPostHandler(postContent, loggedIn.user.displayName)}>
        Submit
      </button>
    </div>
  );
}

export default CreatePost;
import React, { useState } from 'react';
import axios from 'axios';
import Navbar from '../../Components/Navigation/Navbar';
import classes from './CreatePost.module.css';
import { fb } from '../../Firebase/firebase';
import { useHistory } from 'react-router-dom';

const CreatePost = () => {
  const [postTitle, setPostTitle] = useState('')
  const [postContent, setPostContent] = useState('')

  let history = useHistory()

  const submitPostHandler = (title, post) => {
    let content = { title, post }
    fb.firestore().collection('posts').add(content)
    history.push('/home_page')
  }
  console.log('[Create Post] render')
  return (
    <div className={classes.createPost}>
      <Navbar />
      Please create a post.
      <input
        value={postTitle}
        onChange={event => setPostTitle(event.target.value)}
        placeholder='Title' />
      <input
        value={postContent}
        onChange={event => setPostContent(event.target.value)}
        placeholder='Content' />
      <button onClick={() => submitPostHandler(postTitle, postContent)}>
        Submit
      </button>
    </div>
  );
}

export default CreatePost;
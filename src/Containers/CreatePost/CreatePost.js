import React, { useState, useContext } from 'react';
import Navbar from '../../Components/Navigation/Navbar/Navbar';
import classes from './CreatePost.module.css';
import { fb } from '../../Firebase/firebase';
import { useHistory } from 'react-router-dom';
import { authContext } from '../../Context/authContext';
import Input from '../../Components/UI/Input/Input';
import Button from '../../Components/UI/Button/Button';

const CreatePost = () => {
  const [postContent, setPostContent] = useState('')
  const [loggedIn] = useContext(authContext);
  let history = useHistory()

  const submitPostHandler = (post, user, photo) => {
    let date = new Date();
    let ampm = 'AM'
    let dd = String(date.getDate()).padStart(2, '0');
    let mm = String(date.getMonth() + 1).padStart(2, '0');
    let yyyy = date.getFullYear();
    let hours = date.getHours();
    if (hours > 12) {
      hours = hours - 12
      ampm = 'PM'
    }
    let minutes = date.getMinutes();
    if (minutes < 10) {
      minutes = '0' + minutes
    }
    let time = hours + ':' + minutes + ' ' + ampm + ' ' + mm + '/' + dd + '/' + yyyy;
    let content = { post, user, date, time, photo }
    fb.firestore().collection('posts').add(content)
  }

  console.log('[Create Post] render')
  return (
    <div className={classes.createPost}>
      <Navbar />
      <Input
        value={postContent}
        onChange={event => setPostContent(event.target.value)}
        placeholder='Content' />
      <Button onClick={() => submitPostHandler(postContent, loggedIn.user.displayName, loggedIn.user.photoURL)}>
        Submit
      </Button>
    </div>
  );
}

export default CreatePost;
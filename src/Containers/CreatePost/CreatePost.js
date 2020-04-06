import React, {useState} from 'react';
import axios from 'axios';
import Navbar from '../../Components/Navigation/Navbar';
import classes from './CreatePost.module.css';

const CreatePost = () => {
  const [postTitle, setPostTitle] = useState('')
  const [postContent, setPostContent] = useState('')

  const submitPostHandler = (post, title) => {
    axios.post('https://social-media-d03f3.firebaseio.com/posts.json', {post, title})
  }
  console.log('render')
  return ( 
    <div className={classes.createPost}>
      <Navbar />
      Please create a post.
      <input 
        value ={postTitle}
        onChange={event => setPostTitle(event.target.value)}
        placeholder='Title'/>
      <input 
        value={postContent}
        onChange={event => setPostContent(event.target.value)}
        placeholder='Content'/>
      <button onClick={() => submitPostHandler(postContent, postTitle)}>
        Submit
      </button>
    </div>
   );
}
 
export default CreatePost;
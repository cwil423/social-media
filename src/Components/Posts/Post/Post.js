import React from 'react';
import classes from './Post.module.css';

const Post = (props) => {
  return (
    <div className={classes.post}>
      <h2 >{props.info.post}</h2>
      <h2>-{props.info.user}</h2>
    </div>

  );
}

export default Post;

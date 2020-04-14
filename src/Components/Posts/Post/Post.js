import React from 'react';
import classes from './Post.module.css';

const Post = (props) => {
  return (
    <h2 className={classes.post}>{props.info.title}: {props.info.post}</h2>
  );
}

export default Post;

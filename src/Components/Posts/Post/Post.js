import React, { useContext } from 'react';
import classes from './Post.module.css';
import { authContext } from '../../../Context/authContext';

const Post = (props) => {
  const date = props.info.date.toDate()
  return (
    <div className={classes.post}>
      <h2 >{props.info.post}</h2>
      <img className={classes.userPhoto} src={props.info.photo} alt='new' />
      <h2>-{props.info.user}</h2>

      <h3>{props.info.time}</h3>

    </div>

  );
}

export default Post;

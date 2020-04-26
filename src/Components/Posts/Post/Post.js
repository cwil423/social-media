import React from 'react';
import classes from './Post.module.css';

const Post = (props) => {
  let classApplied = classes.post
  if (props.clickable) {
    classApplied = classes.clickablePost
  }


  return (
    <div className={classApplied} onClick={props.clickable ? () => props.clicked(props.info.uid, props.info.photo, props.info.user) : null}>

      {props.deletable ? <button onClick={() => props.delete(props.info.postId)} className={classes.delete}>X</button> : null}
      <h2 >{props.info.post}</h2>
      <img className={classes.userPhoto} src={props.info.photo} alt='new' />
      <h2>-{props.info.user}</h2>
      <h3>{props.info.time}</h3>

    </div>

  );
}

export default Post;

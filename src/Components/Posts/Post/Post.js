import { Typography } from '@material-ui/core';
import React from 'react';
import { Button } from '@material-ui/core';
import classes from './Post.module.css';

const Post = (props) => {
  let classApplied = classes.post;
  if (props.clickable) {
    classApplied = classes.clickablePost;
  }

  return (
    <div
      className={classApplied}
      onClick={
        props.clickable
          ? () =>
              props.clicked(props.info.uid, props.info.photo, props.info.user)
          : null
      }
    >
      {props.deletable ? (
        <div className={classes.delete}>
          <Button
            onClick={() => props.delete(props.info.postId)}
            variant="contained"
            color="secondary"
          >
            X
          </Button>
        </div>
      ) : null}

      <div className={classes.info}>
        <div>
          <img className={classes.userPhoto} src={props.info.photo} alt="new" />
        </div>
        <div className={classes.topSection}>
          <Typography variant="h6">{props.info.user}</Typography>
          <Typography variant="h6">{props.info.time}</Typography>
        </div>
      </div>
      <Typography variant="body1">{props.info.post}</Typography>
    </div>
  );
};

export default Post;

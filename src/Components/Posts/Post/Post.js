import { Typography } from '@material-ui/core';
import React, { useState } from 'react';
import { Button } from '@material-ui/core';
import classes from './Post.module.css';
import Modal from '../../UI/Modal/Modal';

const Post = (props) => {
  const [modalOpen, setModalOpen] = useState(false);

  const closeModalHandler = (bool) => {
    setModalOpen(!modalOpen);
    if (bool) {
      props.onDelete(props.info.postId);
    }
  };

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
      <Modal open={modalOpen} closeModal={closeModalHandler} />
      {props.deletable ? (
        <div className={classes.delete}>
          <Button
            onClick={() => setModalOpen(true)}
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

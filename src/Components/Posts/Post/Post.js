import React, { useState, useContext } from 'react';
import { Typography } from '@material-ui/core';
import { fb } from '../../../Firebase/firebase';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import { Button } from '@material-ui/core';
import classes from './Post.module.css';
import Modal from '../../UI/Modal/Modal';
import { authContext } from '../../../Context/authContext';

const Post = (props) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [loggedIn] = useContext(authContext);

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
    <div className={classApplied}>
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
        <div
          className={classes.topSection}
          onClick={
            props.clickable
              ? () =>
                  props.clicked(
                    props.info.uid,
                    props.info.photo,
                    props.info.user
                  )
              : null
          }
        >
          <Typography variant="h6">{props.info.user}</Typography>
          <Typography variant="h6">{props.info.time}</Typography>
        </div>
      </div>
      <div>
        <Typography variant="body1">{props.info.post}</Typography>
      </div>

      <div className={classes.like}>
        <div className={classes.likeStuff}>
          <Typography variant="subtitle1">{props.info.likes}</Typography>
          {props.liked ? (
            <FavoriteIcon onClick={() => props.onLike(props.info)} />
          ) : (
            <FavoriteBorderIcon onClick={() => props.onLike(props.info)} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Post;

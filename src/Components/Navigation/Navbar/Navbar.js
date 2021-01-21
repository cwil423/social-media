import React from 'react';
import { NavLink } from 'react-router-dom';
import { Typography } from '@material-ui/core';
import { fb } from '../../../Firebase/firebase';
import classes from './Navbar.module.css';

const signOutHandler = () => {
  fb.auth().signOut();
};

const Navbar = () => {
  return (
    <div className={classes.navbar}>
      <Typography variant="h5" className={classes.title}>
        FriendBook
      </Typography>
      <ul className={classes.navLinks}>
        <NavLink
          className={classes.navLink}
          activeClassName={classes.isActive}
          to="/home_page"
        >
          Home
        </NavLink>
        <NavLink
          className={classes.navLink}
          activeClassName={classes.isActive}
          to="/create_post"
        >
          Create Post
        </NavLink>
        <NavLink
          className={classes.navLink}
          activeClassName={classes.isActive}
          to="profile"
        >
          Profile
        </NavLink>
        <NavLink
          className={classes.navLink}
          to="/login"
          onClick={signOutHandler}
        >
          Sign Out
        </NavLink>
      </ul>
    </div>
  );
};

export default Navbar;

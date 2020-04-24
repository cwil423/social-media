import React from 'react';
import { NavLink } from 'react-router-dom';
import { fb } from '../../../Firebase/firebase';
import classes from './Navbar.module.css';

const signOutHandler = () => {
  fb.auth().signOut()
}

const Navbar = () => {
  return (
    <div className={classes.navbar}>
      <h1 className={classes.title}>FriendBook</h1>
      <ul className={classes.navLinks}>
        <NavLink className={classes.navLink} to='/home_page'>
          Home
        </NavLink>
        <NavLink className={classes.navLink} to='/create_post'>
          Create Post
        </NavLink>
        <NavLink className={classes.navLink} to='profile'>
          Profile
        </NavLink>
        <NavLink className={classes.navLink} to='/login' onClick={signOutHandler}>
          Sign Out
        </NavLink>
      </ul>
      <hr />
    </div>
  );
}

export default Navbar;
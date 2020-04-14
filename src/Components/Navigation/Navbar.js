import React from 'react';
import { NavLink } from 'react-router-dom';
import { fb } from '../../Firebase/firebase';
import classes from './Navbar.module.css';

const signOutHandler = () => {
  fb.auth().signOut()
}

const Navbar = () => {
  return (
    <div className={classes.navbar}>
      <h1>FriendBook</h1>
      <ul className={classes.navLinks}>
        <NavLink to='/home_page'>
          Home
        </NavLink>
        <NavLink to='/create_post'>
          Create Post
        </NavLink>
        <NavLink to='profile'>
          Profile
        </NavLink>
        <NavLink to='/login' onClick={signOutHandler}>
          Sign Out
        </NavLink>

      </ul>
    </div>
  );
}

export default Navbar;
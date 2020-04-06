import React from 'react';
import { NavLink } from 'react-router-dom';
import { fb } from '../../Firebase/firebase';

const signOutHandler = () => {
  fb.auth().signOut()
}

const Navbar = () => {
  return (
    <div>
      <h1>Logo</h1>
      <ul>
        <NavLink to='/home_page'>
          Home
        </NavLink>
        <NavLink to='/create_post'>
          Create Post
        </NavLink>
        <NavLink to='/login' onClick={signOutHandler}>
          Sign Out
        </NavLink>
      </ul>
    </div>
  );
}

export default Navbar;
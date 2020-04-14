import React, { useState, useContext } from 'react';
import './App.css';
import Auth from './Containers/Auth/Auth';
import Login from './Containers/Auth/LoginAndSignUp/Login';
import { Switch, Route, Redirect } from 'react-router-dom';
import HomePage from './Containers/HomePage/HomePage';
import CreatePost from './Containers/CreatePost/CreatePost';
import { fb } from './Firebase/firebase';
import { authContext } from './Context/authContext';
import ProtectedRoute from './Components/Navigation/ProtectedRoute';
import Profile from './Containers/Profile/Profile';
import { useDispatch } from 'react-redux';


function App() {

  // fb.auth().onAuthStateChanged(user => {
  //   if (user) {
  //     console.log(user)
  //     dispatch();
  //   } else {
  //     setLoggedIn(false);
  //   };
  // });

  return (
    <div className="App">
      <Switch>
        <Route exact path='/'>
          <Redirect to='/login' />
        </Route>
        <Route path='/login' component={Auth} />
        <ProtectedRoute path={'/create_post'} component={CreatePost} />
        <ProtectedRoute path={'/home_page'} component={HomePage} />
        <ProtectedRoute path={'/profile'} component={Profile} />
      </Switch>
    </div>
  );
}

export default App;

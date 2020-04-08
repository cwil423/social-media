import React, { useState, useContext } from 'react';
import './App.css';
import Auth from './Containers/Auth/Auth';
import { Switch, Route, Redirect } from 'react-router-dom';
import HomePage from './Containers/HomePage/HomePage';
import CreatePost from './Containers/CreatePost/CreatePost';
import { fb } from './Firebase/firebase';
import { authContext } from './Context/authContext';
import ProtectedRoute from './Components/Navigation/ProtectedRoute';


function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path='/'>
          <Redirect to='/login' />
        </Route>
        <Route path='/login' component={Auth} />
        <ProtectedRoute path={'/create_post'} component={CreatePost} />
        <ProtectedRoute path={'/home_page'} component={HomePage} />
      </Switch>
    </div>
  );
}

export default App;

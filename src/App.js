import React, { useState } from 'react';
import './App.css';
import Auth from './Containers/Auth/Auth';
import { Switch, Route, Redirect } from 'react-router-dom';
import HomePage from './Containers/HomePage/HomePage';
import CreatePost from './Containers/CreatePost/CreatePost';
import { fb } from './Firebase/firebase';


function App() {

  return (
    <div className="App">
      <Switch>
        <Route exact path='/'>
          <Redirect to='/login' />
        </Route>
        <Route path='/login' component={Auth} />
        <Route path='/home_page' component={HomePage} />
        <Route path='/create_post' component={CreatePost} />
      </Switch>
      {/* {loggedIn ? <Posts /> : <Login login={onLoginHandler}/>} */}
    </div>
  );
}

export default App;

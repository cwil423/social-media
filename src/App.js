import React from 'react';
import './App.css';
import Auth from './Containers/Auth/Auth';
import { Switch, Route, Redirect } from 'react-router-dom';
import HomePage from './Containers/HomePage/HomePage';
import CreatePost from './Containers/CreatePost/CreatePost';
import ProtectedRoute from './Components/Navigation/ProtectedRoute';
import Profile from './Containers/Profile/Profile';
import Navbar from './Components/Navigation/Navbar/Navbar';
import OtherProfile from './Components/OtherProfile/OtherProfile';

function App() {
  return (
    <div className="App">
      {/* <Navbar /> */}
      <Switch>
        <Route exact path='/'>
          <Redirect to='/login' />
        </Route>
        <Route path='/login' component={Auth} />
        <ProtectedRoute path={'/create_post'} component={CreatePost} />
        <ProtectedRoute path={'/home_page'} component={HomePage} />
        <ProtectedRoute path={'/profile'} component={Profile} />
        <ProtectedRoute path={'/user'} component={OtherProfile} />
      </Switch>
    </div>
  );
}

export default App;

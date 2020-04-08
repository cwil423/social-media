import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom'
import Auth from '../../Containers/Auth/Auth';
import { authContext } from '../../Context/authContext';

const ProtectedRoute = (props) => {
  const [loggedIn] = useContext(authContext)
  console.log(loggedIn)
  if (loggedIn) {
    return (
      <Route path={props.path} component={props.component} />
    );
  } else {
    return (
      <Route path={'/'} component={Auth}>
        <Redirect to={'/login'} />
      </Route>
    )
  }

}

export default ProtectedRoute;
import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom'
import Auth from '../../Containers/Auth/Auth';
import { authContext } from '../../Context/authContext';

const ProtectedRoute = React.memo((props) => {
  const [loggedIn] = useContext(authContext)
  // Changing loggedIn below to something more specific causes unneccesary re-renders
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

})

export default ProtectedRoute;
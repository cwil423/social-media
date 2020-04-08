import React, { useState, useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import * as authActions from '../../Store/Actions/auth';
import classes from './Auth.module.css';
import { fb } from '../../Firebase/firebase';
import { authContext } from '../../Context/authContext';



const Auth = (props) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [signIn, setSignIn] = useState(false)
  const [loggedIn, setLoggedIn] = useContext(authContext);

  useEffect(() => {
    if (loggedIn) {
      history.push('/home_page')
    }
  }, []);

  let history = useHistory();

  const signUpHandler = () => {
    // props.signUp(email, password);
    fb.auth().createUserWithEmailAndPassword(email, password)
      .catch((error) => {
        alert(error)
      })
    setSignIn(true)
  };

  const signInHandler = () => {
    fb.auth().signInWithEmailAndPassword(email, password)
      .catch((error => {
        alert(error)
      }));
    history.push('/home_page')

  };

  let signButton = null
  signIn ? signButton = <button onClick={signInHandler}>Sign In</button> : signButton = <button onClick={signUpHandler}>Sign Up</button>

  return (
    <div className={classes.login}>
      <input
        value={email}
        onChange={(event) => setEmail(event.target.value)} />
      <input
        value={password} onChange={(event) => setPassword(event.target.value)} />
      {signButton}
      <p>{signIn === false ? 'Already a user?' : 'New user? Create an account below'}</p>
      <button onClick={() => setSignIn(!signIn)}>{signIn === false ? 'Sign In' : 'Sign Up'}</button>
    </div>
  );
}




export default Auth;
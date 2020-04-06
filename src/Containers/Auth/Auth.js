import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import * as authActions from '../../Store/Actions/auth';
import classes from './Auth.module.css';
import { fb } from '../../Firebase/firebase';



const Login = (props) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [signIn, setSignIn] = useState(false)

  let history = useHistory();

  fb.auth().onAuthStateChanged((user) => {
    if (user) {
      history.push('/home_page')
    }
  })

  const signUpHandler = () => {
    // props.signUp(email, password);
    fb.auth().createUserWithEmailAndPassword(email, password).catch((error) => {
      alert(error)
    })
    setSignIn(true)

    // props.signIn();
    // fb.auth().signInWithEmailAndPassword(email, password).catch(error => {
    //   console.log(error)
    // })
    // history.push('/home_page');
  };

  const signInHandler = () => {
    fb.auth().signInWithEmailAndPassword(email, password).catch((error => {
      alert(error)
    }));
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

const mapDispatchToProps = dispatch => {
  return {
    // signUp: (email, password) => dispatch(authActions.signUp(email, password)),
    // signIn: (email, password) => dispatch(authActions.signIn(email, password))
  }

}

export default connect(null, mapDispatchToProps)(Login);
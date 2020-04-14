import React, { useState, useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import * as authActions from '../../Store/Actions/auth';
import classes from './Auth.module.css';
import { fb } from '../../Firebase/firebase';
import { authContext } from '../../Context/authContext';
import Navbar from '../../Components/Navigation/Navbar';



const Auth = (props) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [signIn, setSignIn] = useState(true)
  const [loggedIn] = useContext(authContext);

  useEffect(() => {
    if (loggedIn) {
      history.push('/home_page')
    }
  });

  let history = useHistory();

  const signUpHandler = () => {
    // props.signUp(email, password);
    fb.auth().createUserWithEmailAndPassword(email, password)
      .then(result => {
        fb.firestore().collection("users").doc(result.user.uid).set({
          user: email
        })
        console.log(result.user.uid)
      })
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

  };

  let signButton = null
  signIn ? signButton = <button onClick={signInHandler}>Sign In</button> : signButton = <button onClick={signUpHandler}>Sign Up</button>


  return (
    <div className={classes.auth}>
      <h1 className={classes.title}>FriendBook</h1>
      <input
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        placeholder={'Email'} />
      <input
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        placeholder={'Password'} />
      {/* {signIn === false ? <input value={name} onChange={(event) => setName(event.target.value)} placeholder={'Full Name'} /> : null} */}
      {signButton}
      <p>{signIn === false ? 'Already a user?' : 'New user? Create an account below'}</p>
      <button onClick={() => setSignIn(!signIn)}>{signIn === false ? 'Sign In' : 'Sign Up'}</button>
    </div>
  );
}




export default Auth;
import React, { useState, useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import classes from './Auth.module.css';
import { fb } from '../../Firebase/firebase';
import { authContext } from '../../Context/authContext';
import Button from '../../Components/UI/Button/Button';
import Input from '../../Components/UI/Input/Input';




const Auth = (props) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
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
      })
      .catch((error) => {
        alert(error)
      })
    setSignIn(true)
    setTimeout(() => alert('Please go to the Profile page and set up your username and photo.'), 2000)


  };

  const signInHandler = () => {
    fb.auth().signInWithEmailAndPassword(email, password)
      .catch((error => {
        alert(error)
      }));

  };

  let signButton = null
  signIn ? signButton = <Button onClick={signInHandler}>Sign In</Button> : signButton = <Button onClick={signUpHandler}>Sign Up</Button>

  console.log('[Auth] render')
  return (
    <div className={classes.auth}>
      <h1 className={classes.title}>FriendBook</h1>
      <Input
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        placeholder={'Email'} />
      <Input
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        placeholder={'Password'}
        type={'password'} />
      {signButton}
      <p>{signIn === false ? 'Already a user?' : 'New user? Create an account below.'}</p>
      <Button onClick={() => setSignIn(!signIn)}>{signIn === false ? 'Sign In' : 'Sign Up'}</Button>
    </div>
  );
}




export default Auth;
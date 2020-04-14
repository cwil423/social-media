import React, { useState, useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { fb } from '../../../Firebase/firebase';
import { authContext } from '../../../Context/authContext';
import classes from './Login.module.css';
import Navbar from '../../../Components/Navigation/Navbar';



const Login = (props) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [signIn, setSignIn] = useState(false)
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
    fb.auth().signInWithEmailAndPassword(email, password)
      .catch((error => {
        alert(error)
      }));
  };

  return (
    <div className={classes.login}>
      <Navbar />
      <input
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        placeholder={'Email address'} />
      <input
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        placeholder={'Password'} />
      <button onClick={signUpHandler}>Sign Up</button>
    </div>
  );
}




export default Login;
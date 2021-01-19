// import React, { useState, useContext, useEffect } from 'react';
// import { useHistory } from 'react-router-dom';
// import classes from './Auth.module.css';
// import { fb } from '../../Firebase/firebase';
// import { authContext } from '../../Context/authContext';
// import Button from '../../Components/UI/Button/Button';
// import Input from '../../Components/UI/Input/Input';

// const Auth = (props) => {
// const [email, setEmail] = useState('')
// const [password, setPassword] = useState('')
// const [signIn, setSignIn] = useState(true)
// const [errorMessage, setErrorMessage] = useState()
// const [loggedIn] = useContext(authContext);

// useEffect(() => {
//   if (loggedIn) {
//     history.push('/home_page')
//   }
// });

//   let history = useHistory();

// const signUpHandler = () => {
//   // props.signUp(email, password);
//   fb.auth().createUserWithEmailAndPassword(email, password)
//     .then(result => {
//       fb.firestore().collection("users").doc(result.user.uid).set({
//         user: email
//       })
//     })
//     .catch((error) => {
//       setErrorMessage(error.message)
//     })
//   setSignIn(true)
//   setTimeout(() => alert('Please go to the Profile page and set up your username and photo.'), 2000)

// };

// const signInHandler = () => {
//   fb.auth().signInWithEmailAndPassword(email, password)
//     .catch((error => {
//       setErrorMessage(error.message)
//     }));

// };

//   let signButton = null
//   signIn ? signButton = <Button onClick={signInHandler}>Sign In</Button> : signButton = <Button onClick={signUpHandler}>Sign Up</Button>

// let errorMessagePlace = null
// if (errorMessage != null) {
//   errorMessagePlace = <p className={classes.error}>{errorMessage}</p>
// }
//   console.log('[Auth] render')
//   return (
//     <div className={classes.auth}>
//       <h1 className={classes.title}>FriendBook</h1>
//       <Input
//         value={email}
//         onChange={(event) => setEmail(event.target.value)}
//         placeholder={'Email'} />
//       <Input
//         value={password}
//         onChange={(event) => setPassword(event.target.value)}
//         placeholder={'Password'}
//         type={'password'} />
//       {signButton}
//       {errorMessagePlace}
//       <p>{signIn === false ? 'Already a user?' : 'New user? Create an account below.'}</p>
//       <Button onClick={() => setSignIn(!signIn)}>{signIn === false ? 'Sign In' : 'Sign Up'}</Button>
//     </div>
//   );
// }

// export default Auth;

import React, { useState, useEffect, useContext } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useHistory } from 'react-router-dom';
import classes from './Auth.module.css';
import { fb } from '../../Firebase/firebase';
import { authContext } from '../../Context/authContext';
import Input from '../../Components/UI/Input/Input';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  title: {
    color: '#3f51b5',
    // backgroundColor: '#3f51b5',
    // borderRadius: '8px',
    padding: theme.spacing(1),
    margin: theme.spacing(4),
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignIn() {
  const classes = useStyles();
  const history = useHistory();
  const [errorMessage, setErrorMessage] = useState();
  const [loggedIn] = useContext(authContext);

  useEffect(() => {
    if (loggedIn) {
      history.push('/home_page');
    }
  });

  // const signUpHandler = () => {
  //   // props.signUp(email, password);
  //   fb.auth().createUserWithEmailAndPassword(email, password)
  //     .then(result => {
  //       fb.firestore().collection("users").doc(result.user.uid).set({
  //         user: email
  //       })
  //     })
  //     .catch((error) => {
  //       setErrorMessage(error.message)
  //     })
  //   setSignIn(true)
  //   setTimeout(() => alert('Please go to the Profile page and set up your username and photo.'), 2000)
  // };

  const loginHandler = (values) => {
    fb.auth()
      .signInWithEmailAndPassword(values.email, values.password)
      .catch((error) => {
        setErrorMessage(error.message);
      });
  };

  let errorMessagePlace = null;
  if (errorMessage != null) {
    errorMessagePlace = <p className={classes.error}>{errorMessage}</p>;
  }

  const LoginSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().required('Required'),
  });

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography variant="h2" className={classes.title}>
          FriendBook
        </Typography>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Formik
          initialValues={{
            email: '',
            password: '',
          }}
          validationSchema={LoginSchema}
          onSubmit={(values) => loginHandler(values)}
        >
          {() => (
            <Form className={classes.form} noValidate>
              <Field
                as={TextField}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <ErrorMessage name="email" />
              <Field
                as={TextField}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <ErrorMessage name="email" />
              {errorMessagePlace}
              {/* <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          /> */}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Sign In
              </Button>

              {/* <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid> */}
              <Grid item>
                <Link href="/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Form>
          )}
        </Formik>
      </div>
    </Container>
  );
}

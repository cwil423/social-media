import React, { useState, useContext } from 'react';
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
import { fb } from '../../Firebase/firebase';
import { authContext } from '../../Context/authContext';
import Input from '../../Components/UI/Input/Input';

const useStyles = makeStyles((theme) => ({
  paper: {
    paddingTop: theme.spacing(8),
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
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignUp() {
  const classes = useStyles();
  const history = useHistory();

  const [errorMessage, setErrorMessage] = useState();
  const [loggedIn] = useContext(authContext);

  const signUpHandler = (values) => {
    // props.signUp(email, password);
    fb.auth()
      .createUserWithEmailAndPassword(values.email, values.password)
      .then((result) => {
        fb.firestore().collection('users').doc(result.user.uid).set({
          user: values.email,
        });
        const user = fb.auth().currentUser;
        user.updateProfile({
          displayName: `${values.firstName} ${values.lastName}`,
        });
        history.push('/home_page');
      })
      .catch((error) => {
        setErrorMessage(error.message);
      });
  };

  const signUpSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string()
      .required('Required')
      .min(6, 'Password must be at least 6 characters'),
    firstName: Yup.string().required('Required'),
    lastName: Yup.string().required('Required'),
  });

  let errorMessagePlace = null;
  if (errorMessage != null) {
    errorMessagePlace = <p className={classes.error}>{errorMessage}</p>;
  }

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
          Sign up
        </Typography>
        <Formik
          validateOnBlur={false}
          initialValues={{
            email: '',
            password: '',
            firstName: '',
            lastName: '',
          }}
          validationSchema={signUpSchema}
          onSubmit={(values) => signUpHandler(values)}
        >
          {() => (
            <Form className={classes.form} noValidate>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Field
                    as={TextField}
                    autoComplete="fname"
                    name="firstName"
                    variant="outlined"
                    required
                    fullWidth
                    id="firstName"
                    label="First Name"
                    autoFocus
                  />
                  <ErrorMessage name="firstName" />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Field
                    as={TextField}
                    variant="outlined"
                    required
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    autoComplete="lname"
                  />
                  <ErrorMessage name="lastName" />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    as={TextField}
                    variant="outlined"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                  />
                  <ErrorMessage name="email" />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    as={TextField}
                    variant="outlined"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                  />
                  <ErrorMessage name="password" />
                </Grid>
              </Grid>
              {errorMessagePlace}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Sign Up
              </Button>
            </Form>
          )}
        </Formik>
        <Grid item>
          <Link href="/login" variant="body2">
            {'Already have an account? Sign in'}
          </Link>
        </Grid>
      </div>
    </Container>
  );
}

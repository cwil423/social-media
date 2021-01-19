import React from 'react';
import { Card, makeStyles, Paper, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    display: 'flex',
    color: '#3f51b5',
    padding: theme.spacing(2),
    justifyContent: 'center',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '50px',
    justifyContent: 'center',
    boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.2)',
    marginBottom: '25px',
  },
  // pageIcon: {
  //   display: 'inline-block',
  //   padding: theme.spacing(2),
  //   margin: theme.spacing(2),
  // },

  user: {
    marginRight: '25px',
  },
  iconAndTitles: {
    display: 'flex',
    alignItems: 'center',
  },
}));

const PageHeader = ({ icon, title, subtitle, user }) => {
  const classes = useStyles();

  return (
    <Paper elevation={0} className={classes.root}>
      <div className={classes.iconAndTitles}>
        {/* <Card className={classes.pageIcon}>{icon}</Card> */}
        <div>
          <Typography variant="h4">{title}</Typography>
          <Typography>{subtitle}</Typography>
        </div>
      </div>
      <div className={classes.user}>
        {user ? 'Current User:' : null}

        <Typography>
          {user ? user.firstName : null} {user ? user.lastName : null}
        </Typography>
      </div>
    </Paper>
  );
};

export default PageHeader;

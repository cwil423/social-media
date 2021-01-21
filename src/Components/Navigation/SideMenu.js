import React from 'react';
import { fb } from '../../Firebase/firebase';
import { NavLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import HomeIcon from '@material-ui/icons/Home';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import AddIcon from '@material-ui/icons/Add';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

const drawerWidth = 300;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerContainer: {
    overflow: 'auto',
  },
  navLinks: {
    textDecoration: 'none',
    color: theme.palette.text.primary,
  },
  link: {
    padding: '15px',
  },
}));

export default function ClippedDrawer() {
  const classes = useStyles();

  // const media = useMediaQuery('(min-width: 769px)');

  const signOutHandler = () => {
    fb.auth().signOut();
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h5" noWrap>
            FriendBook
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <Toolbar />
        <div className={classes.drawerContainer}>
          <List>
            <NavLink to={'/home_page'} className={classes.navLinks}>
              <ListItem button className={classes.link}>
                <ListItemIcon>
                  <HomeIcon />
                </ListItemIcon>
                <ListItemText primary="Home Page" />
              </ListItem>
            </NavLink>
            <Divider />
            <NavLink to={'/profile'} className={classes.navLinks}>
              <ListItem button className={classes.link}>
                <ListItemIcon>
                  <AccountCircleIcon />
                </ListItemIcon>
                <ListItemText primary="Profile" />
              </ListItem>
            </NavLink>
            <Divider />
            <NavLink to={'/create_post'} className={classes.navLinks}>
              <ListItem button className={classes.link}>
                <ListItemIcon>
                  <AddIcon />
                </ListItemIcon>
                <ListItemText primary="Create Post" />
              </ListItem>
            </NavLink>
            <Divider />
            <NavLink
              to={'/login'}
              className={classes.navLinks}
              onClick={signOutHandler}
            >
              <ListItem button className={classes.link}>
                <ListItemIcon>
                  <ExitToAppIcon />
                </ListItemIcon>
                <ListItemText primary="Sign Out" />
              </ListItem>
            </NavLink>
          </List>
          <Divider />
        </div>
      </Drawer>
    </div>
  );
}

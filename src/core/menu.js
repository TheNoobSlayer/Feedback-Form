import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import HomeIcon from '@material-ui/icons/Home'
import { Link, withRouter } from 'react-router-dom'
import auth from './../auth/auth-helper'



const isActive = (history, path) => {
    if (history.location.pathname == path)
        return { color: '#ff4081' }
    else
        return { color: '#ffffff' }
}
const Menu = withRouter(({ history }) => (
    <AppBar position="static">
        <Toolbar>
            <Typography type="title" color="inherit">
                Feedback Form
            </Typography>
            <Link to="/">
                <IconButton aria-label="Home" style={isActive(history, "/")}>
                    <HomeIcon />
                </IconButton>
            </Link>
            <Link to="/subjects">
                <Button style={isActive(history, "/subjects")}>Subjects</Button>
            </Link>
            <Link to="/users">
                <Button style={isActive(history, "/users")}>Users</Button>
            </Link>
            {
                !auth.isAuthenticated() && (<span>
                    <Link to="/signup">
                        <Button style={isActive(history, "/signup")}>Sign up
            </Button>
                    </Link>
                    <Link to="/signin">
                        <Button style={isActive(history, "/signin")}>Sign In
            </Button>
                    </Link>
                </span>)
            }
            {
                auth.isAuthenticated() && (<span>
                    <Link to={"/user/" + auth.isAuthenticated().user._id}>
                        <Button style={isActive(history, "/user/" + auth.isAuthenticated().user._id)}>My Profile</Button>
                    </Link>
                    <Button color="inherit" onClick={() => {
                        auth.signout(() => history.push('/'))
                    }}>Sign out</Button>
                </span>)
            }
           
        </Toolbar>
    </AppBar>
))

export default Menu

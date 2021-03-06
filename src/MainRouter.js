import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import Home from './core/Home'
import Users from './user/Users'
import Signup from './user/Signup'
//import Signin from './user/signin'
import Questions from './user/Questions'
import EditProfile from './user/EditProfile'
import Profile from './user/Profile'
import Subjects from './user/Subjects'


import Signin from './auth/Signin'

import PrivateRoute from './auth/PrivateRoute'
import Menu from './core/menu'
const styles = theme => ({
    card: {
        maxWidth: 600,
        margin: 'auto',
        textAlign: 'center',
        marginTop: theme.spacing.unit * 5,
        paddingBottom: theme.spacing.unit * 2
    },
    error: {
        verticalAlign: 'middle'
    },
    title: {
        marginTop: theme.spacing.unit * 2,
        color: theme.palette.openTitle
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 300
    },
    submit: {
        margin: 'auto',
        marginBottom: theme.spacing.unit * 2
    }
})
console.log(styles);
class MainRouter extends Component {
    

    render() {
        return (<div>
            <Menu />
            <Switch>
                
                <Route exact path="/" component={Home} />
                <Route path="/users" component={Users} />
                <Route path="/questions/of/:subjectId" component={Questions} />
                <Route path="/subjects" component={Subjects}/>
                <Route path="/signup" component={Signup} />
                <Route path="/signin" component={Signin} />
                <PrivateRoute path="/user/edit/:userId" component={EditProfile} />
                <Route path="/user/:userId" component={Profile} />



                
            
               
            </Switch>
        </div>)
    }
}

export default MainRouter

import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import MainRouter from './MainRouter'

import Signup from './user/Signup';
import { createMuiTheme, makeStyles, MuiThemeProvider } from '@material-ui/core/styles';
//import { indigo, pink } from '@material-ui/colors'

import Menu from './core/menu'

const theme = createMuiTheme({
    palette: {
        primary: {
            light: '#757de8',
            main: '#3f51b5',
            dark: '#002984',
            contrastText: '#fff',
        },
        secondary: {
            light: '#ff79b0',
            main: '#ff4081',
            dark: '#c60055',
            contrastText: '#000',
        },
        //openTitle: indigo['400'],
        //protectedTitle: pink['400'],
        type: 'dark'
    }
})
const App = () => (
    <Router>
        <MuiThemeProvider theme={theme}>
            <MainRouter />
        </MuiThemeProvider>
    </Router>
)

export default App;

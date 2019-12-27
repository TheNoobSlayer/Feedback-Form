const express = require('express');
//import path from 'path'
const bodyParser = require('body-parser')

const cors = require('cors');

const studentRoutes = require('./routes/studentRoutes');
const teacherRoutes = require('./routes/teacherRoutes');
const subjectRoutes = require('./routes/subjectRoutes');
const questionRoutes = require('./routes/questionRoutes');


const authRoutes = require('./routes/authRoutes');


const CURRENT_WORKING_DIR = process.cwd()
const app = express()

//comment out before building for production
//devBundle.compile(app)

// parse body params and attache them to req.body
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// enable CORS - Cross Origin Resource Sharing
app.use(cors())

//app.use('/dist', express.static(path.join(CURRENT_WORKING_DIR, 'dist')))

// mount routes
app.use('/', studentRoutes);
app.use('/', subjectRoutes);
app.use('/', teacherRoutes);
app.use('/', authRoutes);
app.use('/', questionRoutes);


/*
app.get('*', (req, res) => {
    const sheetsRegistry = new SheetsRegistry()
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
            openTitle: indigo['400'],
            protectedTitle: pink['400'],
            type: 'light'
        },
    })
    const generateClassName = createGenerateClassName()
    const context = {}
    const markup = ReactDOMServer.renderToString(
        <StaticRouter location={req.url} context={context}>
            <JssProvider registry={sheetsRegistry} generateClassName={generateClassName}>
                <MuiThemeProvider theme={theme} sheetsManager={new Map()}>
                    <MainRouter />
                </MuiThemeProvider>
            </JssProvider>
        </StaticRouter>
    )
    if (context.url) {
        return res.redirect(303, context.url)
    }
    const css = sheetsRegistry.toString()
    res.status(200).send(Template({
        markup: markup,
        css: css
    }))
})
*/
// Catch unauthorised errors
app.use((err, req, res, next) => {
    if (err.name === 'UnauthorizedError') {
        res.status(401).json({ "error": err.name + ": " + err.message })
    }
})

module.exports= app

const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const compress = require('compression');
const cors = require('cors');
const helmet=require('helmet');

const studentRoutes = require('./routes/studentRoutes');
const teacherRoutes = require('./routes/teacherRoutes');
const subjectRoutes = require('./routes/subjectRoutes');
const questionRoutes = require('./routes/questionRoutes');


const authRoutes = require('./routes/authRoutes');


const CURRENT_WORKING_DIR = process.cwd()
const app = express()

app.use(cors({
    origin: 'http://localhost:3000',
    credentials:"true"
}))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(cookieParser())
app.use(compress())
app.use(helmet())

app.use(function (req, res, next) {
    //console.log("Bo inside express respone");
    res.header("Access-Control-Allow-Origin", "*");

    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept,");
    res.header("Access-Control-Allow-Credentials");
    next();

});


app.use('/', studentRoutes);
app.use('/', subjectRoutes);
app.use('/', teacherRoutes);
app.use('/', authRoutes);
app.use('/', questionRoutes);


app.use((err, req, res, next) => {
    if (err.name === 'UnauthorizedError') {
        res.status(401).json({ "error": err.name + ": " + err.message })
    }
})

module.exports= app

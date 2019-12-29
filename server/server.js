const config = require('./../config/config');
const app = require('./express');
const mongoose = require('mongoose')

mongoose.Promise = global.Promise
mongoose.connect(config.mongoUri)
mongoose.connection.on('error', () => {
    throw new Error(`unable to connect to database: ${mongoUri}`)
})

app.listen(config.port, (err) => {
    if (err) {
        console.log(err)
    }
    console.info('Server started on port %s.', config.port)
    console.log(`mongo port: ${config.mongoUri}`);
})

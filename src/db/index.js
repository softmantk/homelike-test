const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const logger = require('../util/logger');
const { connect, connection } = mongoose;
const { database: { dbURI, ...options } } = require('../config');

connect(dbURI, {
    ...options,
    useFindAndModify: false,
});
// mongoose.set('debug', true);
// CONNECTION EVENTS
connection.on('connected', () => logger.info('connected to database'));

connection.on('error', (err) => logger.error(`Database connection error: ${err}`));

connection.on('disconnected', () => logger.info('Database connection disconnected'));

// If the Node process ends, close the Mongoose connection
process.on('SIGINT', () => {
    connection.close(() => {
        logger.info('Database connection disconnected through app termination');
        process.exit(0);
    });
});
fs.readdirSync(path.join(__dirname, './models'))
    .filter((file) => file.indexOf('.') !== 0 && file !== 'index.js')
    .forEach((file) => {
        require(path.join(__dirname, './models', file));
    });
module.exports = connection;

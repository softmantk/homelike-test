/*************************************************************
 * Start the Node process by invoking all the booting services
 **************************************************************/

const express = require('express');
const loaders = require('./src/loaders');
const logger = require('./src/util/logger');

async function startServer() {
    const app = express();
    global.loaderConnections = await loaders(app);
    logger.info("Server started ...!")
}

// noinspection JSIgnoredPromiseFromCall
startServer();
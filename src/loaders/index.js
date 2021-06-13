/*****************************
 * Load boot up functions here
 ******************************/
const expressServer = require('../loaders/express');
module.exports = async (app) => {
    const server = await expressServer(app);
    return {server}
}

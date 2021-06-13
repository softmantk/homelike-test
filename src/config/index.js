require('dotenv-flow')
    .config();
module.exports = {
    server: {
        PORT: process.env.PORT,
        BASE_URL: process.env.BASE_URL,
    },
    userVerificationTokenExpiry: 1, // in hr
    userLoginTokenExpiry: 27 * 14, // in hr

    logLevel: process.env.LOG_LEVEL || 'info',
    apiDocs: {
        username: process.env.API_DOCS_USERNAME,
        password: process.env.API_DOCS_PASSWORD
    },
    environment: process.env.NODE_ENV || 'develop',
    database: {
        dbURI: process.env.dbURI,
        poolSize: process.env.poolSize,
        useNewUrlParser: process.env.useNewUrlParser,
        useCreateIndex: process.env.useCreateIndex,
        useUnifiedTopology: process.env.useUnifiedTopology,
        useFindAndModify: process.env.useFindAndModify,
        autoReconnect: process.env.autoReconnect,
        socketTimeoutMS: process.env.socketTimeoutMS,
        connectTimeoutMS: process.env.connectTimeoutMS,
    }
};

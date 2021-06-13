require('dotenv-flow')
    .config();
if (process.env.MAX_PARALLEL_AI_VIDEO_UPLOADS) {
    if (isNaN(+process.env.MAX_PARALLEL_AI_VIDEO_UPLOADS)) {
        throw 'Invalid configuration';
    }
}

module.exports = {
    server: {
        PORT: process.env.PORT,
        BASE_URL: process.env.BASE_URL,
    },
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
    },
    email: {
        host: process.env.EMAIL_HOST,
        user: process.env.EMAIL_USER,
        password: process.env.EMAIL_PASS,
        from: process.env.EMAIL_FROM,
    }
};

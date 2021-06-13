/**
 *  External Library imports
 * */
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const morgan = require('morgan');
const swaggerUi = require('swagger-ui-express');
const basicAuth = require('express-basic-auth');
const YAML = require('yamljs');
const cors = require('cors');
const OpenApiValidator = require('express-openapi-validator');

const logger = require('../util/logger');
const util = require('../util');
const API = require('../routes/api');
const config = require('../config');
require('../util/logger');
require('../db');

/***********************************************
 * Express routers
 ************************************************ */

const publicRouter = require('../routes/public');
const authRouter = require('../routes/auth');

/***********************************************
 * Routers and Middleware imports
 ************************************************ */
const {isAuthenticated} = require('../middlewares/auth');
const {internalError} = require('../util/errors');

/***********************************************
 * Swagger setup
 ************************************************ */
const spec = path.join(__dirname, '../', 'swagger.yaml');
const swaggerSpecification = YAML.load('./src/swagger.yaml');

const apiDocsBasicAuth = basicAuth({
    users: {
        [config.apiDocs.username]: config.apiDocs.password,
    },
    challenge: true,
});

module.exports = async (app) => {
    app.use(express.static(path.join(__dirname, '../', 'public')));

    /***********************************************
     * Public routers
     ************************************************ */
    app.use('/', publicRouter);
    app.use(cors());
    app.use('/api-docs', apiDocsBasicAuth, swaggerUi.serve, swaggerUi.setup(swaggerSpecification));
    app.use(morgan('dev'));
    app.use(express.json());
    app.use(helmet());
    app.use(express.urlencoded({extended: false}));
    app.use(cookieParser());
    app.use('/spec', express.static(spec));
    app.use(OpenApiValidator.middleware({
        apiSpec: spec,
        validateRequests: true,
        // validateResponses: true,
    }),)
    app.use('/', authRouter);

    /***********************************************
     * Any other routes require authorisation header.
     ************************************************ */
    app.use(isAuthenticated);
    /***********************************************
     * api router initialization call
     ************************************************ */
    API.init(app);

    // noinspection JSUnusedLocalSymbols
    /***********************************************
     * Express Error handler middleware
     ************************************************ */
    app.use(async (err, req, res, next) => {
        logger.error(":err", err);
        if ([400, 401, 404].includes(err.status)) {
            return util.createErrorResponse(err, req, res);
        }
        return res.status(500).json(internalError);
    });

    /***********************************************
     * Run the app and listen on port
     ************************************************ */
    return app.listen(config.server.PORT, () => {
        logger.info(`App Running on ${config.server.PORT}`);
    });
};

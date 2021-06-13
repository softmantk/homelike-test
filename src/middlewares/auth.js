const {verifyToken} = require('../util');
const errors = require('../util/errors');
const logger = require('../util/logger');
module.exports.isAuthenticated = async (req, res, next) => {
    if (!req.headers.authorization) {
        logger.error('authorization header not found');
        return next(errors.unauthorisedError);
    }
    if (!req.headers.authorization.includes('Bearer ')) {
        logger.error('bearer token not found');
        return next(errors.unauthorisedError);
    }
    const token = req.headers.authorization.split(' ')[1];
    let decoded;
    try {
        decoded = await verifyToken(token);
    } catch (e) {
        const knownErrors = ['TokenExpiredError', 'JsonWebTokenError'];
        if (knownErrors.includes(e.name)) {
            return next(errors.unauthorisedError);
        }
        return next(e);
    }
    req.user = decoded.data;
    return next();
};
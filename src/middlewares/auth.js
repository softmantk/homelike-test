const userService = require('../services/userService');
const errors = require('../util/errors');
const logger = require('../util/logger');
module.exports.isAuthenticated = async (req, res, next) => {
    if (!req.headers.authorization) {
        return next(errors.getErrorByCode('unauthorisedError'));
    }
    if (!req.headers.authorization.includes('Bearer ')) {
        logger.error('bearer token not found');
        return next(errors.getErrorByCode('unauthorisedError'));
    }
    const token = req.headers.authorization.split(' ')[1];
    let decoded;
    try {
        decoded = await userService.verifyToken(token);
    } catch (e) {
        const knownErrors = ['TokenExpiredError', 'JsonWebTokenError'];
        if (knownErrors.includes(e.name)) {
            return next(errors.getErrorByCode('unauthorisedError'));
        }
        return next(e);
    }
    req.user = decoded.data;
    return next();
};
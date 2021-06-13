const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const {SECRET_JWT_KEY} = process.env;

const createToken = async (data, expiry, key) => jwt.sign({
    exp: expiry || Math.floor(Date.now() / 1000) + (60 * 60) * 8, // 8 hr
    data
}, SECRET_JWT_KEY || key);

const verifyToken = async (token, key) => jwt.verify(token, key || SECRET_JWT_KEY);

const decodeToken = async (token) => jwt.decode(token, {complete: true});

const createHash = async (data, rounds) => {
    const salt = await bcrypt.genSalt(rounds || 10);
    return bcrypt.hash(JSON.stringify(data), salt);
};
const compareAgainstHash = async (data, hash) => bcrypt.compare(JSON.stringify(data), hash);

const createErrorResponse = (
    {
        code,
        message,
        status = 400,
        name,
        ...actionParams
    }, req = {}, res,
) => {
    code = code || name;
    const body = {
        code,
        message,
        requestId: req.id || res.id,
    };
    if (!_.isEmpty(actionParams)) {
        body.actionParams = actionParams;
    }
    const defaultHeaders = {
        'Access-Control-Allow-Origin': '*',
    };
    res.headers = {
        ...defaultHeaders,
    };
    return res.status(status)
        .json(body);
};
const createSuccessResponse = (body, res, options = {}) => {
    const {
        status = 200,
        headers = {},
        // req,
    } = options;
    const defaultHeaders = {
        'Access-Control-Allow-Origin': '*',
    };
    res.headers = {
        ...res.headers,
        ...defaultHeaders,
        ...headers
    };
    return res.status(status)
        .json(body);
};


const createRandomBytes = async (length = 64) => {
    return crypto.randomBytes(length)
        .toString('hex');
};
module.exports = {
    createToken,
    createHash,
    verifyToken,
    decodeToken,
    compareAgainstHash,
    createErrorResponse,
    createSuccessResponse,
    createRandomBytes,
};

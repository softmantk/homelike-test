const crypto = require('crypto');
const _ = require('lodash');

const delay = (ms) => new Promise((res) => setTimeout(res,ms))
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
    createErrorResponse,
    createSuccessResponse,
    createRandomBytes,
    delay
};

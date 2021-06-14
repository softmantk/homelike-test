const errorCodes = {
    unauthorisedError: {
        status: 401,
        code: "UnauthorizedError",
        message: "Access denied"
    },
    badRequest: {
        status: 400,
        code: "Bad request"
    },
    notFound: {
        status: 404,
        code: "NotFound",
        message: "resource not found"
    },
    invalidRequest: {
        status: 406,
        code: "InvalidRequest",
    },
    internalError: {
        status: 500,
        code: "internalError",
        message: "internal error"
    },
    userNotFound: {
        status: 404,
        code: 'NotFound',
        message: "User not found"
    },
    userAccountNotVerified: {
        status: 401,
        code: "NotVerified",
        message: "Please verify your account first."
    },
}
const errors = Object.keys(errorCodes);

const getErrorByCode = (code) => errorCodes[code];

const getErrorByErrorCode = (code) => Object.keys(errorCodes).find(err => errorCodes[err].code === code);
/**
 * Create error object
 * @param {Object} errorCode
 * @param {String} [message]
 * @param {String} [code]
 * @param {Number} [status]
 *
 * */
const createError = (errorCode, message, code, status) => {
    const rsp = {
        ...errorCodes[errorCode],
        message: message || errorCodes[errorCode].message,
        code: code || errorCodes[errorCode].code,
        status: status || errorCodes[errorCode].status,
    }
    return rsp;
}
module.exports = {
    // errorCodes,
    createError,
    errors,
    getErrorByCode,
    getErrorByErrorCode
}
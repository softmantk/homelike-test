const moment = require("moment");
const config = require('../config')
const User = require('../db/models/user');
const logger = require('../util/logger');
const userService = require('../services/userService');
const {createError, errors} = require('../util/errors')

const createUser = async (data) => {
    const existingUser = await User.findOne({
        email: data.email
    });
    logger.debug('5:createUser:existingUser:', existingUser);
    if (existingUser) {
        // todo verification is not done.
        if (!existingUser.account.verification.verified) {
            throw createError("unauthorisedError", "Account not verified")
        }
        if (existingUser.email === data.email) {
            throw createError("invalidRequest", "User already exist")
        }
    }
    data.password = await userService.createHash(data.password);
    const emailVerificationCode = await userService.createRandomBytes(72);
    const codeExpiry = moment()
        .add(config.userVerificationTokenExpiry, 'h');
    data.account = {
        status: 'active',
        verification: {
            // todo implement email config. now bypass
            verified: true,
            code: emailVerificationCode
        },
        expiry: codeExpiry
    };
    let newUser = await User.create(data);
    return newUser;
}
const userLogin = async (body) => {
    const {email, password} = body;
    const user = await User.findOne({
        email
    });
    if (!user) {
        throw createError("notFound", 'User not registered with this email');
    }
    logger.debug("userLogin:user", user);
    if (!user.account.verification.verified) {
        throw createError("unauthorisedError", 'Your account is not verified.', 'AccountNotVerified');
    }
    const correctPassword = await userService.compareAgainstHash(password, user.password);
    if (!correctPassword) {
        throw createError("unauthorisedError", 'Username/Email or password is incorrect ');
    }
    const validity = (Math.floor(Date.now() / 1000)) + (60 * 60) * config.userLoginTokenExpiry // hour * userLoginTokenExpiry
    const token = await userService.createToken(user, validity);
    return {
        token,
        user
    };
};

module.exports = {
    createUser,
    userLogin
}
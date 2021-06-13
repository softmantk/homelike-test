const userService = require('../services/userService');

const createUser = async (user) => {
    const newUser = await userService.createUser(user);

    return newUser
}
const userLogin = async (body) => {
    const { email, password } = body;
    const user = await User.findOne({
        email
    })
        .populate('role')
        .populate('learnerProfile');
    if (!user) {
        throw new BadRequestError('Email-ID/Password is incorrect');
    }
    logger.debug('38:userLogin:user:', user);
    if (!user.account.verification.verified) {
        throw new UnauthorizedError('Your account is not verified.', 'AccountNotVerified');
    }
    if (user.role.name === 'learner') {
        const { learnerProfile } = user;
        if (!learnerProfile || learnerProfile && learnerProfile.deleted) {
            logger.debug('userLogin:learnerProfile: ', learnerProfile);
            throw new UnauthorizedError('Your account has been suspended ');
        }
    }
    const correctPassword = await compareAgainstHash(password, user.password);
    logger.debug('40:userLogin:correctPassword:', correctPassword);
    if (!correctPassword) {
        throw new UnauthorizedError('Username/Email or password is incorrect ');
    }
    const validity = Math.floor(Date.now() / 1000) + TOKEN_EXPIRY;
    const token = await createToken(user, validity);
    return {
        token,
        user
    };
};

module.exports = {
    createUser,
    userLogin
}
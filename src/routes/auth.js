const router = require('express')
    .Router();
const { createSuccessResponse, createErrorResponse } = require('../util');
const userController = require('../controllers/userController');
const logger = require('../util/logger');
const config = require('../config');

router.post('/auth/signup', async (req, res, next) => {
    try {
        const { headers = {} } = req;
        const response = await userController.createUser({
            ...req.body,
            timezone: headers.timezone || config.timezone
        });
        console.log('9::response:', response);
        return createSuccessResponse(response, res);
    } catch (e) {
        console.log('req: ', e);
        return createErrorResponse(e, req, res);
    }
});
router.post('/auth/signin', async (req, res, next) => {
    try {
        const response = await userController.userLogin(req.body);
        console.log('9::response:', response);
        return createSuccessResponse(response, res);
    } catch (e) {
        console.log('req: ', e);
        return createErrorResponse(e, req, res);
    }
});

module.exports = router;

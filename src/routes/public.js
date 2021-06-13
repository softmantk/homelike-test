const router = require('express')
    .Router();
router.route('/').get((req, res,) => {
    return res.send("Welcome")
})
router.route('/ping')
    .get((req, res, next) => {
        return res.send("pong");
    })
    .post((req, res, next) => {
        return res.send("pong");
    })
module.exports = router
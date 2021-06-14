const router = require('express')
    .Router();
const util = require('../../util')
const apartmentController = require('../../controllers/apartmentController')

router.route('/')
    .post(async (req, res, next) => {
        try {
            const favourite = await apartmentController.createApartment(req.body);
            return util.createSuccessResponse(favourite, res,)
        } catch (e) {
            return next(e)
        }
    })
    .get(async (req, res, next) => {
        try {
            const apartments = await apartmentController.findApartments(req.query);
            return util.createSuccessResponse(apartments, res);
        } catch (e) {
            next(e)
        }
    })
router.route('/:id')
    .get(async (req, res, next) => {
        try {
            console.log(":req.params", req.params);
            const apartment = await apartmentController.getApartmentDetailsById(req.params.id);
            return util.createSuccessResponse(apartment, res)
        } catch (e) {
            next(e)
        }
    })
module.exports = router
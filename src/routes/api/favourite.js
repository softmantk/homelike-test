const router = require('express')
    .Router();
const util = require('../../util')
const favouriteController = require('../../controllers/favouriteController')

router.route('/')
    .post(async (req, res, next) => {
        try {
            const favourite = await favouriteController.createFavourite(req.user.id, req.body.apartmentId);
            return util.createSuccessResponse(favourite, res,)
        } catch (e) {
            return next(e)
        }
    })
    .get(async (req, res, next) => {
        try {
            const favourites = await favouriteController.userFavourites(req.user.id);
            return util.createSuccessResponse(favourites, res);
        } catch (e) {
            next(e)
        }
    })
router.route('/:id')
    .delete(async (req, res, next) => {
        try {
            await favouriteController.deleteById(req.params.id);
            return util.createSuccessResponse({message: "deleted successfully"}, res)
        } catch (e) {
            next(e)
        }
    })
module.exports = router
const Favourite = require('../db/models/favourite');
const Apartment = require('../db/models/apartment');
const errors = require('../util/errors')
const logger = require('../util/logger')

exports.createFavourite = async (userId, apartmentId) => {
    const apartment = await Apartment.findById(apartmentId);
    if (!apartment) {
        throw errors.createError('notFound', 'Apartment not found');
    }
    const existingFav = await Favourite.findOne({
        apartment: apartmentId,
        user: userId,
    });
    logger.debug("createFavourite:existingFav", existingFav);
    if (existingFav) {
        throw errors.createError('invalidRequest', 'Already exist')
    }
    const favourite = await Favourite.create({
        user: userId,
        apartment: apartmentId
    });
    return favourite;
}
exports.userFavourites = async (userId) => {
    const favourites = await Favourite.find({
        user: userId
    }).populate('apartment');
    return favourites;
}
exports.deleteById = async (favouriteId) => {
    logger.debug("deleteById:favouriteId", favouriteId);
    const favourite = await Favourite.findById(favouriteId);
    logger.debug("deleteById:favourite", favourite);
    if (!favourite) {
        throw errors.createError('notFound', 'favourite info not found');
    }
    await favourite.delete();
    return true;
}
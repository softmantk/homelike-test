const logger = require('../util/logger');
const util = require('../util')
const errors = require('../util/errors')
const apartmentService = require('../services/apartmentService');

exports.getApartmentDetailsById = async (id) => {
    logger.debug("apartmentById:id", id);
    const apartment = await apartmentService.getById(id);
    if (!apartment) {
        throw errors.createError('notFound', 'apartment not found');
    }
    return apartment;
}
exports.createApartment = async (data) => {
    logger.debug("createApartment:data", data);
    const apartment = await apartmentService.create(data);
    logger.debug("createApartment:apartment", apartment);
    return apartment;
}
exports.findApartments = async (query) => {
    logger.debug("-->findApartments:query", query);
    const locationFilters = util.removeUndefined({
        city: query.city,
        state: query.state,
        country: query.country,
        rooms: query.rooms,
    });
    const radiusFilters = {
        lat: query.lat,
        long: query.long,
        maxDistance: query.maxDistance
    }
    const apartments = await apartmentService.findApartments(query.searchQuery, locationFilters, radiusFilters, query.limit, query.page);
    return apartments
}
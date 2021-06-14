const logger = require('../util/logger');
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
    logger.debug("findApartments:query", query);
    const apartments = await apartmentService.findApartments(query.searchQuery, {
            lat: query.lat,
            long: query.long
        },
        query.radius,
        query.limit,
        query.page
    )
    return apartments
}
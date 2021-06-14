const dot = require('dot-object')
const Apartment = require('../db/models/apartment')
const util = require('../util')
const csc = require('country-state-city').default;
const logger = require('../util/logger');

exports.getCity = (query) => csc.getAllCities().filter(c => c.name);

exports.create = (data) => Apartment.create(data);
exports.getById = (id) => Apartment.findById(id)
exports.findApartments = async (searchQuery, locationFilters, radiusFilters, limit = 20, page = 1) => {
    let apartments;
    let dbQuery = {}
    if (searchQuery) {
        dbQuery["$text"] = {
            $search: searchQuery
        }
    }
    if (Object.keys(locationFilters).length) {
        dbQuery['location.country'] = 'AE'
    }
    logger.debug("findApartments:searchQuery", searchQuery);
    // dbQuery = dot.dot(dbQuery);
    logger.debug("findApartments:radiusFilters", radiusFilters);
    if (Object.keys(radiusFilters).length) {
        console.log("??????????", `^${util.escapeRegex(searchQuery)}`);
        dbQuery ={}
        if (searchQuery) {
            // const searchKey = (new RegExp(`^${util.escapeRegex(searchQuery)}`, 'i'));
            const searchKey = searchQuery
            dbQuery['$or'] = [
                {
                    'title': searchKey
                },
                {
                    'location.city': searchKey
                },
                {
                    'location.code': searchKey
                },
                {
                    'location.streetAddress': searchKey
                }
            ]

        }
        dbQuery["location.loc"] = {
            $near: {
                $geometry: {
                    type: "Point",
                    coordinates: [radiusFilters.long, radiusFilters.lat]
                },
                $maxDistance: radiusFilters.maxDistance,
                // $minDistance: 10000
            }
        }
        logger.debug("findApartments:filters", JSON.stringify(dbQuery, null, 2));
        apartments = await Apartment.find(dbQuery).limit(+limit).skip((+page - 1) * limit)
    } else {
        apartments = await Apartment.find(dbQuery).limit(+limit).skip((+page - 1) * limit)
    }
    logger.debug("findApartments:RESULT: apartments", JSON.stringify(apartments, null, 2));

    return apartments;
}
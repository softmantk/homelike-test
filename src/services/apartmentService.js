const Apartment = require('../db/models/apartment')
const csc = require('country-state-city').default;
const logger = require('../util/logger');

exports.getCity = (query) => csc.getAllCities().filter(c => c.name);

exports.create = (data) => Apartment.create(data);
exports.getById = (id)=> Apartment.findById(id)
exports.findApartments = async (searchQuery, center, radius = 10, limit = 10, page = 1) => {
    logger.debug("findApartments:searchQuery", searchQuery);

    const query = {
        // $text: {
        //     $search: searchQuery
        // },
        // "location.loc": {
        //     "$geoWithin": {
        //         "$centerSphere": [
        //             [
        //                 72.867804,
        //                 19.076033
        //             ],
        //             50
        //         ]
        //     }
        // }

        "location.loc": {
            $nearSphere: {
                $geometry: {
                    type: "Point",
                    coordinates: [-73.9667, 40.78]
                },
                $minDistance: 1000,
                $maxDistance: 5000
            }
        }
    }
    // const query = {
    //     // $text: {
    //     //     $search: searchQuery
    //     // },
    //     // 'location.city': new RegExp(`^${escapeRegex(searchQuery)}`, 'i'),
    //     "location.loc": {
    //         $nearSphere: {
    //             $geometry: {
    //                 type: "Point",
    //                 coordinates: [0, 0]
    //             },
    //             $minDistance: 10000000,
    //             $maxDistance: 100000000000
    //         }
    //     }
    //
    // }
    const apartments = await Apartment
        .find(query, {
            // score: {$meta: "textScore"}
        })


    return apartments;
}
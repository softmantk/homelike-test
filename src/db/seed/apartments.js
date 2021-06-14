require('../');
const {nanoid} = require('nanoid');
const Apartments = require('../models/apartment');
let csc = require('country-state-city').default;
const faker = require('faker');

;(async () => {
        const apartments = []
        console.log("start seed");
        const allCities = csc.getAllCities();
        const loops = 10;
        const startIndex = Math.floor(Math.random() * loops);
        const cities = allCities.slice(startIndex, startIndex + loops);
        for (let i = 0; i < loops; i++) {
            const city = cities[i];
            const apartment = {
                code: nanoid(),
                user: '60c5bc8cc7f747fb5701be6b',
                apartmentType:"studio",
                location: {
                    country: city.countryCode,
                    streetAddress: faker.address.streetAddress(),
                    state: city.stateCode,
                    city: city.name,
                    loc: {
                        type: 'Point',
                        coordinates: [+city.latitude, +city.longitude]
                    }
                }

            }
            apartments.push(apartment);
        }
        await Apartments.insertMany(apartments);
        console.log("seed completed...!")
    }
)()
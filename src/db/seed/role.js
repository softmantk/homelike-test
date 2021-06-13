require('../index');
const Role = require('../models/role');

const roles = [
    {
        _id: '5ed3915c412421e1fda23dbb',
        name: 'assessor',
        priority: '20'
    },
    {
        _id: '5ed391b30eff84d75ea24c9f',
        name: 'learner',
        priority: '15'
    },
    // {
    //     _id: '5ed391d072a6e33b5fe4a231',
    //     name: 'superAdmin'
    // }
];

Role.create(roles)
    .then(() => {
        console.log('roles created successfully');
        process.exit(0);
    })
    .catch((e) => {
        console.error('role seeding failed', e);
        process.exit(1);
    });

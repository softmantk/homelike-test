//todo implement this.
require('../');
const User = require('../models/user');
const { createHash } = require('../../util/');

(async () => {
    try {
        const users = [
            {
                firstName: 'admin',
                lastName: 'admin',
                mobile: 'XXXXXXXXXX',
                email: 'admin@admin.com',
                password: await createHash(123456),
                extCustomerId: v4(),
                roleId: '5ed3915c412421e1fda23dbb',
                account: {
                    verification: {
                        verified: true
                    }
                }
            },
        ];

        await User.create(admin);
        console.log('admin created successfully');
        process.exit(0);
    } catch (e) {
        console.error('admin seeding failed', e);
        process.exit(1);
    }
})();
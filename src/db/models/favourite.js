const mongoose = require('mongoose');
const {Schema} = require('mongoose');

const favouriteSchema = new Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        apartment: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Apartment',
            required: true
        },
    },
    {
        timestamps: true,
        toJSON: {
            transform(doc, ret) {
                ret.id = ret._id;
                // delete ret.deleted
                delete ret._id;
                delete ret.__v;
            },
        },
    },
);

module.exports = mongoose.model('Favourite', favouriteSchema);

const mongoose = require('mongoose');
const {Schema} = mongoose;
const mongooseDelete = require('mongoose-delete');


const pointSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ['Point'],
        required: true
    },
    coordinates: {
        type: [Number],
        required: true
    }
});
const locationSchema = {
    streetAddress: {
        type: mongoose.Schema.Types.String,
        // index: "text",
    },
    city: {
        type: mongoose.Schema.Types.String,
        // index: "text",
    },
    state: {
        type: mongoose.Schema.Types.String,
        // index: "text",
    },
    country: {
        type: mongoose.Schema.Types.String,
        // index: "text",
    },
    loc: {
        type: pointSchema,
        // index: '2dsphere',
        required: true
    }
}

const ApartmentSchema = new Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        title: {
            type: mongoose.Schema.Types.String,
        },
        totalRooms: Number,
        apartmentType: {
            type: mongoose.Schema.Types.String,
            required: true
        },
        code: {
            type: mongoose.Schema.Types.String,
            required: true
        },
        amenities: {
            tv: Boolean,
            heating: Boolean,
            towelAndSheets: Boolean,
            washingMachine: Boolean,
            workDesk: Boolean,
        },
        location: locationSchema
    },
    {
        timestamps: true,
        toObject: {
            transform(doc, ret) {
                ret.id = ret._id;
                delete ret._id;
                delete ret.__v;
            },
            getters: true,
        },
        toJSON: {
            transform(doc, ret) {
                ret.id = ret._id;
                delete ret._id;
                delete ret.__v;
                // delete ret.deleted
            },
            getters: true,
        },
    },
);
ApartmentSchema.index({
    'location.streetAddress': 'text',
    'location.country': 'text',
    'location.state': 'text',
    'location.city': 'text',
});
pointSchema.index({
    loc: '2dsphere'
});
ApartmentSchema.plugin(mongooseDelete, {overrideMethods: true});
// Register UserSchema for 'User' model
const User = mongoose.model('Apartment', ApartmentSchema);

module.exports = User;

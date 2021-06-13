const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const roleSchema = new Schema(
    {
        name: String,
        priority: {
            default: 20,
            type: Number
        },
    },
    {
        timestamps: true,
        toJSON: {
            transform(doc, ret) {
                ret.id = ret._id;
                delete ret._id;
                delete ret.__v;
            },
        },
    },
);

module.exports = mongoose.model('Role', roleSchema);

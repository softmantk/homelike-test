const mongoose = require('mongoose');

const { Schema } = mongoose;
const mongooseDelete = require('mongoose-delete');
require('./role');

const UserSchema = new Schema(
    {
        firstName: String,
        lastName: String,
        email: {
            type: String,
            index: true
        },
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            required: true
        },
        phoneNo: String,
        password: String,
        role: {
            type: mongoose.Schema.Types.ObjectId,
            default: '5ed3915c412421e1fda23dbb',
            ref: 'Role',
            required: true,
        },
        account: {
            status: {
                type: String,
                default: 'active',
            },
            verification: {
                verified: {
                    type: Boolean,
                    default: false,
                },
                expiry: Date,
                code: {
                    type: String,
                    index: true
                },
                passwordReset: {
                    code: String,
                    expiry: Date,
                }
            },
        },

    },
    {
        timestamps: true,
        toObject: {
            transform(doc, ret) {
                ret.id = ret._id;
                delete ret.password;
                delete ret.account.verification;
                delete ret._id;
                delete ret.__v;
            },
            getters: true,
        },
        toJSON: {
            transform(doc, ret) {
                ret.id = ret._id;
                delete ret.password;
                delete ret._id;
                delete ret.__v;
            },
            getters: true,
        },
    },
);
UserSchema
    .virtual('name')
    .get(function () {
        let name = '';
        if (this.firstName) {
            name = this.firstName;
        }
        if (this.lastName) {
            name += ' ' + this.lastName;
        }
        return name;
    });
UserSchema.plugin(mongooseDelete, { overrideMethods: true });
// Register UserSchema for 'User' model
const User = mongoose.model('User', UserSchema);

module.exports = User;

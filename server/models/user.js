/*    COMP 229
 *    Week 6
 *    Assignment 2

 *    Author: Jack Que (301220028)
 *    Date:   22/1/2022

 *    Filename: user.js
 */

// Require Mongoose and Passport
let mongoose = require('mongoose');
let passportLocalMongoose = require('passport-local-mongoose');

let User = mongoose.Schema({
    username: {
        type: String,
        default: '',
        trim: true,
        required: 'Username is required '
    },
    email: {
        type: String,
        default: '',
        trim: true,
        required: 'Email Address is required '
    },
    displayName: {
        type: String,
        default: '',
        trim: true,
        required: 'Name is required '
    },
    created: {
        type: Date,
        default: Date.now
    },
    update: {
        type: Date,
        default: Date.now
    }
},
    { collection: "users" }
);

// Options Configuration
let options = ({ missingPasswordError: 'Incorrect Username or Password ' });

User.plugin(passportLocalMongoose, options);

module.exports.User = mongoose.model('User', User);
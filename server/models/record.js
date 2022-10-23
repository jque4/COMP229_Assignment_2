/*    COMP 229
 *    Week 6
 *    Assignment 2

 *    Author: Jack Que (301220028)
 *    Date:   22/1/2022

 *    Filename: record.js
 */

let mongoose = require('mongoose');

// Creating a model class
let recordModel = mongoose.Schema({
    name: String,
    phone: String,
    email: String,
},
{
    collection: "records"
});

module.exports = mongoose.model('Record', recordModel);
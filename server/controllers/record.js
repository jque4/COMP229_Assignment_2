/*    COMP 229
 *    Week 6
 *    Assignment 2

 *    Author: Jack Que (301220028)
 *    Date:   22/1/2022

 *    Filename: app.js
 */

let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

// Creates reference to models
let Record = require('../models/record');

module.exports.displayRecordList = (req, res, next) => {
    Record.find((err, recordList) => {
        if (err) {
            return console.error(err);
        } else {
            res.render('record/list', {
                title: 'Business Contacts', 
                RecordList: recordList.sort((a,b)=>a.name.localeCompare(b.name)),
                displayName: req.user ? req.user.displayName : ''
            });      
        }
    });
}

module.exports.displayAddPage = (req, res, next) => {
    res.render('record/add', {title: 'Add Contact', displayName: req.user ? req.user.displayName : ''})          
}

module.exports.processAddPage = (req, res, next) => {
    let newRecord = Record({
        "name": req.body.name,
        "phone": req.body.phone,
        "email": req.body.email,
    });

    Record.create(newRecord, (err, Record) =>{
        if (err) {
            console.log(err);
            res.end(err);
        } else {
            res.redirect('/recordlist');
        }
    });

}

module.exports.displayUpdatePage = (req, res, next) => {
    let id = req.params.id;

    Record.findById(id, (err, recordToUpdate) => {
        if (err) {
            console.log(err);
            res.end(err);
        } else {
            res.render('record/update', {
                title: 'Update Contact', 
                record: recordToUpdate, 
                displayName: req.user ? req.user.displayName : ''})
        }
    });
}

module.exports.processUpdatePage = (req, res, next) => {
    let id = req.params.id

    let updatedRecord = Record({
        "_id": id,
        "name": req.body.name,
        "phone": req.body.phone,
        "email": req.body.email
    });

    Record.updateOne({_id: id}, updatedRecord, (err) => {
        if (err) {
            console.log(err);
            res.end(err);
        } else {
            // refresh the record list
            res.redirect('/recordlist');
        }
    });
}

module.exports.performDelete = (req, res, next) => {
    let id = req.params.id;

    Record.remove({_id: id}, (err) => {
        if (err) {
            console.log(err);
            res.end(err);
        } else {
             res.redirect('/recordlist');
        }
    });
}
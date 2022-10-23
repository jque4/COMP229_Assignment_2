/*    COMP 229
 *    Week 6
 *    Assignment 2

 *    Author: Jack Que (301220028)
 *    Date:   22/1/2022

 *    Filename: record.js
 */


let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
let passport = require('passport');

// Connect to the record model and controller
let recordController = require('../controllers/record');

// Authentication Helper Function
function requireAuth(req, res, next) {
    // Check User Authentication
    if (!req.isAuthenticated()) return res.redirect('/login');
    next();
}

/* GET Route for the Record List page */
router.get('/', requireAuth, recordController.displayRecordList);

/* GET Route for displaying the Add page */
router.get('/add', requireAuth, recordController.displayAddPage);

/* POST Route for processing the Add page */
router.post('/add', requireAuth, recordController.processAddPage);

/* GET Route for displaying the Update page */
router.get('/update/:id', requireAuth, recordController.displayUpdatePage);

/* POST Route for processing the Update page */
router.post('/update/:id', requireAuth, recordController.processUpdatePage);

/* GET to perform  Deletion */
router.get('/delete/:id', requireAuth, recordController.performDelete);

module.exports = router;
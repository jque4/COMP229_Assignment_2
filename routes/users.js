/*    COMP 229
 *    Week 4
 *    Assignment 1

 *    Author: Jack Que (301220028)
 *    Date:   10/1/2022

 *    Filename: users.js
 */

/* Variables */
var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('Users Placeholder');
});

module.exports = router;

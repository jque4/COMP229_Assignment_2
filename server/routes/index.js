/*    COMP 229
 *    Week 6
 *    Assignment 2

 *    Author: Jack Que (301220028)
 *    Date:   22/1/2022

 *    Filename: index.js
 */

/* Variables */
var express = require('express');
var router = express.Router();

let indexController = require('../controllers/index')

/* GET Home page. */
router.get('/', indexController.displayHomePage);

/* GET Home page. */
router.get('/home', indexController.displayHomePage);

/* GET About Me page. */
router.get('/about', indexController.displayAboutPage);

/* GET Projects page. */
router.get('/projects', indexController.displayProjectsPage);

/* GET Services page. */
router.get('/services', indexController.displayServicesPage);

/* GET Contact page. */
router.get('/contact', indexController.displayContactPage);

/* GET Login page */
router.get('/login', indexController.displayLoginPage);

/* POST Login page */
router.post('/login', indexController.processLoginPage);

/* GET Register page */
router.get('/register', indexController.displayRegisterPage);

/* POST Register page */
router.post('/register', indexController.processRegisterPage);

/* GET Logout */
router.get('/logout', indexController.performLogout);

module.exports = router;

/*    COMP 229
 *    Week 6
 *    Assignment 2

 *    Author: Jack Que (301220028)
 *    Date:   22/1/2022

 *    Filename: index.js
 */

/* Require Express, Mongoose and Passport */
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
let passport = require('passport');

// Setup User Models
let userModel = require('../models/user');
let User = userModel.User;

/* GET Home page. */
module.exports.displayHomePage = (req, res, next) => {
    res.render('index', {title: 'Home', displayName: req.user ? req.user.displayName : ''});
}
/* GET About Me page. */
module.exports.displayAboutPage = (req, res, next) => {
    res.render('about', { title: 'About', displayName: req.user ? req.user.displayName : ''});
}
/* GET Projects page. */
module.exports.displayProjectsPage = (req, res, next) => {
    res.render('projects', { title: 'Projects', displayName: req.user ? req.user.displayName : ''});
}
/* GET Services page. */
module.exports.displayServicesPage = (req, res, next) => {
    res.render('services', { title: 'Services', displayName: req.user ? req.user.displayName : ''});
}
/* GET Contact page. */
module.exports.displayContactPage = (req, res, next) => {
    res.render('contact', { title: 'Contact', displayName: req.user ? req.user.displayName : ''});
}

module.exports.displayLoginPage = (req, res, next) => {
    // User Login Check
    if (!req.user) {
        res.render('auth/login', {
           title: "Login",
           messages: req.flash('loginMessage'),
           displayName: req.user ? req.user.displayName : '' 
        })
    } else {
        return res.redirect('/');
    }
}

module.exports.processLoginPage = (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) return next(err);
        if (!user) { // Invalid User Error
            req.flash('loginMessage', 'Incorrect Username or Password ');
            return res.redirect('/login');
        }
        req.login(user, (err) => {
            if (err) return next(err);
            const payload = {
                id: user._id,
                displayName: user.displayName,
                username: user.username,
                email: user.email
            }
            /*const authToken = jwt.sign(payload, DB.Secret, {
                expiresIn: 86400 // 1 Day
            });*/
            return res.redirect('/recordlist');
        });
    }) (req, res, next);
}

module.exports.displayRegisterPage = (req, res, next) => {
    // User Login Check
    if (!req.user) {
        res.render('auth/register', {
            title: 'Register',
            messages: req.flash('registerMessage'),
            displayName: req.user ? req.user.displayName : ''
        });
    } else {
        return res.redirect('/');
    }
}

module.exports.processRegisterPage = (req, res, next) => {
    // Create New User Object
    let newUser = new User({
        username: req.body.username,
        email: req.body.email,
        displayName: req.body.displayName
    });

    User.register(newUser, req.body.password, (err) => {
        if (err) { // On Registration Error
            console.log("Error Creating New User ");
            if (err.name == "UserExistsError") {
                req.flash(
                    'registerMessage',
                    'Registration Error: User Already Exists! '
                );
                console.log('Registration Error: User Already Exists! ')
            }
            return res.render('auth/register', {
                title: 'Register',
                messages: req.flash('registerMessage'),
                displayName: req.user ? req.user.displayName : ''
            });
        } else {
            return passport.authenticate('local')(req, res, () => {
                res.redirect('/recordlist')
            });
        }
    });
}

module.exports.performLogout = (req, res, next) => {
    req.logout(e=>e);
    res.redirect('/');
}
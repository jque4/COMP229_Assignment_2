/*    COMP 229
 *    Week 6
 *    Assignment 2

 *    Author: Jack Que (301220028)
 *    Date:   22/1/2022

 *    Filename: app.js
 */

// Installed 3rd Party Packages 
let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');

// Authentication Modules
let session = require('express-session');
let passport = require('passport');
let passportLocal = require('passport-local');
let localStrategy = passportLocal.Strategy;
let flash = require('connect-flash');


// Setup Database
let mongoose = require('mongoose');
let DB = require('./db')

// Connect mongoose to the DB URI
mongoose.connect(DB.URI, {useNewUrlParser: true, useUnifiedTopology: true});
let mongoDB = mongoose.connection;

// Log connection status
mongoDB.on('error', console.error.bind(console, 'Error connecting to database: '));
mongoDB.once('open', () => {
  console.log("Connected to MongoDB! ");
});

let indexRouter = require('../routes/index');
let usersRouter = require('../routes/users');
let recordsRouter = require('../routes/record');
const { readyException } = require('jquery');

let app = express();

// Setup View Engine
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs');

// Loading assets and other directories
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../../public')));
app.use(express.static(path.join(__dirname, '../../node_modules')));

// Setup Express Session
app.use(session({
  secret: "SomeSecret",
  saveUninitialized: false,
  resave: false
}));

// Setup Connect-flash
app.use(flash());

// Setup Passport
app.use(passport.initialize());
app.use(passport.session());

// Setup User Model Instance
let userModel = require('../models/user');
let User = userModel.User;

// Setup Local User Strategy
passport.use(User.createStrategy());

// Setup Serialization Methods
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/recordlist', recordsRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error', { title: 'Error' });
});

module.exports = app;

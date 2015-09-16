'use strict';

var express = require('express');
var router = express.Router();
var flash = require('connect-flash');
var passport = require('passport'),
 LocalStrategy = require('passport-local').Strategy;	

//collect our routers
var loginRouter = require('./login');
var createAccountRouter = require('./createAccount');
var appRouter = require('./app');
var publicPollsRouter = require('./publicPolls');
var submitPoll = require('./submitPoll');
var myPolls = require('./myPolls');
 
//apply routes 
loginRouter(router,passport,flash);
createAccountRouter(router);
appRouter(router);
publicPollsRouter(router);
submitPoll(router,flash);
myPolls(router);
  
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Voting App' });
});


module.exports = router;
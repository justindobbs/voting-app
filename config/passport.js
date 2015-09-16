'use strict';

var LocalStrategy = require('passport-local').Strategy;
var flash = require('connect-flash');
var passwordHash = require('password-hash-and-salt');

module.exports = function (passport,db) {
		
	passport.serializeUser(function(user, done) {
		done(null, user);
	});

	passport.deserializeUser(function(user, done) {
		done(null, user);
	});

	passport.use('local-login', new LocalStrategy({
			//allows us to pass in the req from our route (lets us check if a user is logged in or not)
			passReqToCallback : true 
		},
		function(req, username, password, done) {
			
			var Users = db.get('users');
			
			// asynchronous
			process.nextTick(function() {
				Users.findOne({ 'username' :  username }, function(err, user) {
					// if there are any errors, return the error
					if (err){
						return done(err);
					}	
					// if no user is found, return the message
					if (!user){
						return done(null, false, req.flash('loginMessage', 'Username or password not found'));
					}
					//password doesn't match user, return message
					if ( !passwordHash(user.password,password) ){
						return done(null, false, req.flash('loginMessage', 'Username or password not found'));
					}
					// all is well, return user
					else{
						return done(null, user);
					}			
				});
			});
	}));
	
	//hash the password so it can be checked against the hashed password	
	function hashAndSalt(userPassword,input){
		var myUser = [];
		var message;
		
		passwordHash(input).hash(function(error, hash) {
			if(error)
				throw new Error('Something went wrong!');

			// Store hash (incl. algorithm, iterations, and salt) 
			input = hash;

			// Verifying a hash 
			password(userPassword).verifyAgainst(input, function(error, verified) {
				if(error)
					throw new Error('Something went wrong!');
				if(!verified) {
					console.log("Don't try! We got you!");
					message = false;
				} else {
					message = true;
				}
			});
		});
		return message;
	}
		
};
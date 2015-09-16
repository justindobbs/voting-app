'use strict';

var xssFilters = require('xss-filters');
var validate = require('./../methods/validateAccountSubmission');
var flash = require('connect-flash');
var sanitize = require('./../methods/sanitizer');
var passwordHash = require('password-hash-and-salt');

var CreateAcountRoute = function(router){
	
	/* GET Create Account page. */
	router.get('/createAccount', function(req,res){
		res.render('createAccount', {title: 'Create Account',messages: '' });
	});
	
	/* POST to Create Account */
	router.post('/createAccount', function(req,res) {
		//Set our internal DB variable
		var db = req.db,
			collection = db.get('users'),
			success = true;
		
		//filter/sanitize body request
		sanitize(req,['username','useremail','password']);
		
		//get our form values. These rely on the "name" attributes
		var userName = req.body.username,
			userEmail = req.body.useremail,
			userPassword = req.body.password;
		
		//validate input
		var mappedErrors = validate(req);
		
		if( mappedErrors ){
			req.flash('emailMessage', mappedErrors.useremail ? mappedErrors.useremail.msg : "");
			res.render('createAccount', {
				title: 'Create Account',
				emailMessage: mappedErrors.useremail ? mappedErrors.useremail.msg : "", 
				passwordMessage: mappedErrors.password ? mappedErrors.password.msg : ""
			});
			return false;
		}
		
		//if username is not taken, continue
		collection.findOne({'username':userName}, function(err,user){
			if(err){ 
				console.log('error');
				res.send('There was a problem adding to databse.');
			}
			if( !user ){ //user doesn't exist, so add
				console.log('not matched');
				insertCollection();
			}
			else{ //name matched, show message
				console.log('found');
				res.send("There was a problem adding to database.");
				return false;
			}
		});

		//Submit to the DB
		function insertCollection(){
			passwordHash(userPassword).hash(function(error, hash) {
				if(error)
					throw new Error('Something went wrong!');

				// Store hash (incl. algorithm, iterations, and salt) 
				userPassword = hash;
			
				collection.insert({
					"username": userName,
					"email": userEmail,
					"password": userPassword,
					"polls": []
				}, function (err,doc) {
					if (err) {
						res.send("There was a problem adding to database.");
					}
					else {
						//if it worked, set header so address bar doesn't still say /adduser
						res.location('login');
						
						//and forward to success page
						res.redirect("login");
					}
				});
			});
		}	
	});
	
}

module.exports = CreateAcountRoute;


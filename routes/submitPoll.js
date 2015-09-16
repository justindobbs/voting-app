'use strict';

var sanitize = require('./../methods/sanitizer');

var SumbitPollRoute = function(router,flash){

	/* POST to Add New Poll */
	router.post('/submitPoll', function(req,res) {
		var reqBodies = [];
		for(var key in req.body){
			reqBodies.push(key);
		}
		sanitize(req,reqBodies);
		
		var date = new Date(),
			db = req.db,
			username = req.user.username,
			submittedPoll = req.body.poll,
			pollBody = req.body,
			optsArray = [];
		
		var time = date.getTime(), //needed to sort by date
			users = db.get('users'),
			publicPollCollection = db.get('publicPollCollection');
		
		for(var key in pollBody){		
			//number to keep track of votes
			optsArray.push( [ 0,pollBody[key] ] )
		}
		
		//remove poll key from body
		optsArray.shift();
		
		updatePublicAndRedirect();
		
		//send poll to public poll db and redirect to myPolls page
		function updatePublicAndRedirect(){	
			publicPollCollection.insert({
				username: username,
				poll: submittedPoll,
				options: optsArray,
				updated: false,
				dateCreated: time
			}, function (err,doc){
				if (err) {
					res.send("There was a problem adding to database.");
				}
				else{
					res.location('myPolls');
					res.redirect("myPolls");
				}
			});
		}
	});
	
}

module.exports = SumbitPollRoute;
'use strict';
 
var PublicPollsRoute = function(router,passport,flash){
		
	var currentPollId;
		
	/***GET***/
	
	router.get('/updatedPolls/:name', function (req, res, next) {
		var fileName = req.params.name;
		var db = req.db;
		var polls = db.get('publicPollCollection');
		
		polls.find({ _id : currentPollId }, function (err, doc){
			if(err) throw err;
			console.log(doc);
			//return single poll
			res.render('updatedPolls', { 
				'user': req.user,
				'polls': doc
			});
		});
	});
	
	/* GET app page. */
	router.get('/publicPolls', function(req, res, next) {
		if(req.user == undefined){
			res.location('/login');
			res.redirect('/login');
			return false;
		}
		
		var db = req.db;
		var polls = db.get('publicPollCollection');
		
		//render all the polls
		polls.find({}, function (err, docs){
			if(err) throw err;
			
			//return newest polls
			docs = docs.sort( function(a,b){
				return b.dateCreated-a.dateCreated;
			});
			res.render('publicPolls', { 
				'user': req.user,
				'polls': docs
			});
		});
	});

	/***POST**/
	
	/* user submitted poll */
	router.post('/publicPolls', function(req,res){
		var db = req.db;
		
		//get our form values. These rely on the "name" attributes
		var option = req.body.option;
		var pollId = req.body.id;
		var poll = req.body.poll;
		var collection = db.get('publicPollCollection');
		
		if( Array.isArray(pollId) ) {
			pollId = pollId[0];
			poll = poll[0];
		}
		
		collection.findOne({ _id: pollId }, function(err,docs){
			if(err) throw err;
			var optionDocs = docs.options.reduce( function(prev,curr,i,map){
				if(curr[1] === option){
					var optionInc = curr[0]+1;
					curr[0] = optionInc;
				}
				prev.push(curr);
				return prev;
			},[]);
			
			collection.findAndModify({ _id: pollId }, { $set: 
				{ 
					options: optionDocs,
					updated: true
				} 
			});
			
			//res.location('publicPolls/ '+ option);
			//res.redirect("publicPolls/" + option);
			currentPollId = pollId;
			res.location('updatedPolls/' + poll);
			res.redirect("updatedPolls/" + poll);
			
		});
	
	});
	
}

module.exports = PublicPollsRoute;
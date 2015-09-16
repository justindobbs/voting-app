'use strict';


var MyPollRouter = function(router){

	var deletePollPromise;

	/* GET MyPolls page */
	router.get('/myPolls', function(req,res,next) {
		if(req.user == undefined){
			res.location('/login');
			res.redirect('/login');
			return false;
		}
		
		var db = req.db;
		var polls = db.get('publicPollCollection');
		
		polls.find({'username': req.user.username}, function (err, docs){
			if(err) throw new Error();
			
			//return newest polls
			docs.sort( function(a,b){
				return b.dateCreated-a.dateCreated;
			});
			
			//render your polls
			res.render('myPolls', { 
				'user': req.user,
				'polls': docs
			});
		});
	});
	
	
	/* POST to delete poll */
	router.post('/deletePoll',function(req,res){
		var poll = req.body;
		var db = req.db;
		var polls = db.get('publicPollCollection');
		
		deletePollPromise = polls.remove({_id: poll._id});
		
		deletePollPromise.on('error', function(err){ throw err });
		deletePollPromise.on('success', function(doc){ console.log('success') });
		deletePollPromise.on('complete', function(err, doc){
			res.send('compoleted');
		});
		
	});
	
}

module.exports = MyPollRouter;
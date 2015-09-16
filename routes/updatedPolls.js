'use strict';

module.exports = function(router){

	/***GET***/
	
	router.get('/updatedPolls', function (req, res, next) {
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

}
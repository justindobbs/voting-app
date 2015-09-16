'use strict';
 
var AppRoute = function(router,passport,flash){
		
	/***GET***/
	
	/* GET app page. */
	router.get('/app', function(req, res, next) {
		
		//user is not authenticated
		if(req.user == undefined){
			res.location('/login');
			res.redirect('/login');
			return false;
		}
		res.render('app', { 'user':req.user });
	
	});
	
}

module.exports = AppRoute;
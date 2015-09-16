'use strict';
 
var LoginRoute = function(router,passport,flash){
		
	/***GET***/
	
	router.get('/logout', function(req,res){
		//remove the session
		req.session.destroy(function(err){
			if(err) throw new Error();
		});
		//send message
		res.send('You have logged out');
	});
	
	/* GET login */
	router.get('/login', function(req, res, next) {
		res.render('login', { 
			'title': 'login', 
			//pass in the flash message (problem logging in)
			'messages': req.flash('loginMessage') 
		});
	});
	
	/* GET login failure */
	router.get('/loginFailure', function(req, res, next) {
		res.redirect('/login');
	});

	/* GET login success */
	router.get('/loginSuccess', function(req, res, next) {
		res.location('app');
		
		//and forward to success page
		res.redirect("app");
	});


	/***POST**/

	/* POST to authenticate password */
	router.post('/login',
		passport.authenticate('local-login', {
			successRedirect: '/loginSuccess',
			failureRedirect: '/loginFailure'
		})
	);
}

module.exports = LoginRoute;


'use strict';

module.exports = function(req){
	
	req.assert('useremail', 'required').notEmpty();
	req.assert('useremail', 'valid email required').isEmail();
	req.assert('password', '6 to 20 characters required').len(6, 20);

	var errors = req.validationErrors();
	var mappedErrors = req.validationErrors(true);
	return mappedErrors;
	
}
	
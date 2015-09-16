'use strict';

module.exports = function(req,params){

	params.forEach( function(param){
		req.sanitize(param).escape();
		req.sanitize(param).trim(); 
	});

}
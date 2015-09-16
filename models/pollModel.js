'use strict';

var PollModel = {

	username: "user",
	
	//the poll query/question
	poll: "pollHeader",
	
	//the number represents is the select counter for the poll option
	options: [ [ 0, "option" ], [ 0, "option" ] ],
	
	//needed to sort by newest
	dateCreated: 1,
	
	//need to check if poll as been updated(voted on)
	updated: false

};

module.exports = PollModel;
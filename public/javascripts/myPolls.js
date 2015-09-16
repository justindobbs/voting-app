'use strict';

$( function(){
	
	var $target;
	var $pollCard;
	var pollData;

	//delete button pushed but won't delete until modal confirm button pushed,
	//also collects poll data from poll card
	$('.card').on('click', '#triggerDelete', function(e){
		$target = $(e.target);
		$pollCard = $target.parent().parent().parent();
		pollData = $target.data('poll');
	});
	
	//send the request to delete poll
	$('body').on('click','#deletePoll', function(e){
		$.ajax({
			type: 'POST',
			url: '/deletePoll',
			data: pollData,
			success: removePoll($pollCard)
		});
	});
	
	//remove elem with fadeOut
	function removePoll(elem){
		elem.delay(100).fadeOut(700);
	}

});


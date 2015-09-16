'use strict';

$( function(){
	
	//collect current radio select and apply css to radio
	var currentVal = "";
	$('.radioPoll').click( function(e){
		var $inner = $(e.target).parent().find('.inner');
		var $div = $(e.target).parent().find('div');
		currentVal = $div.text();
		$($inner).trigger('focus');
		$(e.target).attr('name','option');
		$('.radioPoll').not($(e.target)).removeAttr('name');
	});
	
});
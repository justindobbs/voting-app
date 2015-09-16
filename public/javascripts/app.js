'use strict';

$(function(){
	
	//use this to limit options
	var optionCounter = 2;
	
	//initial options
	for(var i=0;i<2;i++){
		var optionIndex = $('#pollOpts').find('.poll-option').length+1;
		var name = 'option' + optionIndex;
		$('#pollOpts').append(
			'<div class="container-fluid" >' + 
				'<div class="form-group submit-poll">' +			
					'<label for="inputPollOption" class="col-xs-offset-1 col-xs-2 control-label">' + 
					'<span id="removeOption" class="glyphicon glyphicon-ok"></span>' + 
					'</label>' + 
					'<div class="col-xs-8 poll-option">' + 
						'<input required name="' + name + '"type="text" class="form-control" id="inputPollOption" placeholder="option">' +
					'</div>' + 
				'</div>' +
			'</div>'
		);
	}

	$('#addOptionButton').click( function(){
		if( optionCounter<10 ) {
			optionCounter++;
			//need to assign unique names to option by index
			var optionIndex = $('#pollOpts').find('.poll-option').length+1;
			var name = 'option' + optionIndex;
			$('#pollOpts').append(
				'<div class="container-fluid" >' + 
					'<div class="form-group submit-poll">' +			
						'<label for="inputPollOption" class="col-xs-offset-1 col-xs-2 control-label">' +
						'<span id="removeOption" class="glyphicon glyphicon-remove"></span>' + 
						'</label>' + 
						'<div class="col-xs-8 poll-option">' + 
							'<input required name="' + name + '"type="text" class="form-control" id="inputPollOption" placeholder="option">' +
						'</div>' + 
					'</div>' +
				'</div>'
			);
		}
		else{
			alert('You are allowed ten options at the most');
		}
		
	});
	
	//remove the option from the dom
	$('#pollOpts').on('click','#removeOption', function(e){
		var option = $(e.target).parent().parent().parent().remove();
		optionCounter--;
	});
	
});

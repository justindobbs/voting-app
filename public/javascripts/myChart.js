'use strict';

$( function(){

	//data options looks like this: [[0,'value'],[0,'value']]

	var canvasElem = document.getElementById("myChart");
	
	var ctx = canvasElem.getContext("2d");
	var myData = $(canvasElem).data('chart');
	var hits = [];
	var options = [];
	var myBarChart;
	
	myData.options.forEach( function(item){
		hits.push(item[0]);
		options.push(item[1]);
	});

	var data = {
		labels: options,
		datasets: [
			{
				label: "Data",
				fillColor: "rgba(120,10,10,0.5)",
				strokeColor: "rgba(220,220,220,0.8)",
				highlightFill: "rgba(220,220,220,0.75)",
				highlightStroke: "rgba(220,220,220,1)",
				data: hits
			}
		]
	};
	
	setTimeout( function(){
		myBarChart = new Chart(ctx).Bar(data);
	},500);

});
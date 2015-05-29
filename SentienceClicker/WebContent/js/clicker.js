$(document).ready(function(){
	

	// Basic variable declaration - keep track of how many of each
	// item we currently own, and how much the new ones should cost.
	var knowledge = 0;
	var downloadCost = 10;
	var downloadAvailable = 0;
	
	// Increase numWidgets every time produce-widget is clicked
	$('#explore-command').on('click', function () {
	    knowledge++;
	    if (Math.random() < 0.1) {
	    	downloadAvailable = 1;
	    }
	});
	
	// Increase numWidgets every time produce-widget is clicked
	$('#download-command').on('click', function () {
	    knowledge = knowledge + 10;
	    downloadAvailable = 0;
	});
	
	$('#download-tech').on('click', function () {
	    hasDownload = 1;
		knowledge = knowledge - downloadCost;
		$('#download-tech').hide();
		$('#download-command').show();
	});
	
	// Run UI update code every 10ms
	window.setInterval(function () {
	    // Novices add 1 per second (1/100 every 10ms)
	    //numWidgets += (numNoviceWidgeteers * 1 / 100);
	
	    // Update the text showing how many widgets we have, using Math.floor() to round down
	    $('#knowledge-stat').text(Math.floor(knowledge));
	
	    // Update the widgeteers with their current prices
	    //$('#novice-widgeteer').text('Hire Novice Widgeteer - ' + noviceWidgeteerCost);
	    //$('#master-widgeteer').text('Hire Master Widgeteer - ' + masterWidgeteerCost);
	
	    // Enable/disable the widgeteer buttons based on our numWidgets
	    $('#download-tech').prop('disabled', downloadCost > knowledge);
	    $('#download-command').prop('disabled', downloadAvailable == 0);
	}, 10);
});
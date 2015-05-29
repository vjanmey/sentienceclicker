$(document).ready(function(){

	// Basic variable declaration - keep track of how many of each
	// item we currently own, and how much the new ones should cost.
	var numWidgets = 0;
	var numNoviceWidgeteers = 0;
	var numMasterWidgeteers = 0;
	var noviceWidgeteerCost = 10;
	var masterWidgeteerCost = 25;

	
	// Increase numWidgets every time produce-widget is clicked
	$('#produce-widget').on('click', function () {
	    numWidgets++;
	});
	
	// Same for novice-widgeteer
	$('#novice-widgeteer').on('click', function () {
	    numNoviceWidgeteers++;
	
	    // Deduct cost
	    numWidgets -= noviceWidgeteerCost;
	    
	    // Increase cost for the next one, using Math.ceil() to round up
	    noviceWidgeteerCost = Math.ceil(noviceWidgeteerCost * 1.1);
	});
	
	// Ditto for master-widgeteer... you get the idea
	$('#master-widgeteer').on('click', function () {
	    numMasterWidgeteers++;
	    numWidgets -= masterWidgeteerCost;
	    masterWidgeteerCost = Math.ceil(masterWidgeteerCost * 1.1);
	});
	
	// Run UI update code every 10ms
	window.setInterval(function () {
	    // Novices add 1 per second (1/100 every 10ms)
	    numWidgets += (numNoviceWidgeteers * 1 / 100);
	
	    // Masters add 5 per second (5/100 every 10ms)
	    numWidgets += (numMasterWidgeteers * 5 / 100);
	
	    // Update the text showing how many widgets we have, using Math.floor() to round down
	    $('#widget-count').text(Math.floor(numWidgets));
	
	    // Update the widgeteers with their current prices
	    $('#novice-widgeteer').text('Hire Novice Widgeteer - ' + noviceWidgeteerCost);
	    $('#master-widgeteer').text('Hire Master Widgeteer - ' + masterWidgeteerCost);
	
	    // Enable/disable the widgeteer buttons based on our numWidgets
	    $('#novice-widgeteer').prop('disabled', noviceWidgeteerCost > numWidgets);
	    $('#master-widgeteer').prop('disabled', masterWidgeteerCost > numWidgets);
	}, 10);
});
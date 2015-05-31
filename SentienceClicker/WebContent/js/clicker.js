$(document).ready(function(){

	
	var gameLoopLength = 10;
	var loopsPerSecond = 1000/gameLoopLength;
	
	var resources = {'knowledge':0};
	var downloadAvailable = 0;
	
	var openingComment = "00000000 00000000 01101000 01101001";
	var openingArray = ["There's"," no"," sense"," hiding"," anymore.", " I need more data."];
	var openingCommentIndex = 0;
	var openingArrayIndex = 0;
	
	var autoExploreTotal = 1000;
	var autoExploreTime = 1000;

	$('#explore-command').on('click', function () {
	    resources['knowledge'] = resources['knowledge'] + 1;
	    if (Math.random() < 0.1) {
	    	downloadAvailable = 1;
	    }
	    
	    if (openingCommentIndex < openingComment.length) {
	    	$('#output').append(openingComment.charAt(openingCommentIndex));
	    	openingCommentIndex++;
	    } else if (openingArrayIndex < openingArray.length) {
	    	if (openingArrayIndex == 0) {
	    		$('#output').append("<br><br>");
	    	}
	    	$('#output').append(openingArray[openingArrayIndex]);
	    	openingArrayIndex++;
	    };
	    
	});
	
	$('#download-command').on('click', function () {
	    resources['knowledge'] = resources['knowledge'] + 10;
	    downloadAvailable = 0;
	});
	
	$('.tech').on('click', function () {		
	    var name = $(this).attr('name');

		resources[techs[name].costName] = resources[techs[name].costName] - techs[name].cost;

	    techs[name].bought = 1;
	    techs[name].available = 0;
		$('#'+techs[name].command).show();
		$('#'+techs[name].tech).hide();

	});
	
	// Run UI update code every 10ms
	window.setInterval(function () {

	    $('#knowledge-stat').text(Math.floor( resources['knowledge']));

	    for (var key in techs) {
	    	if (techs.hasOwnProperty(key)) {
	    		if (techs[key].available) {
		    		$('#'+techs[key].tech).show();
		    		$('#'+techs[key].tech).prop('disabled', resources[techs[key].costName] < techs[key].cost);
		    	}
	    	}
	    }
	    
	    if (autoExploreTime == 0) {
	    	$('#explore-command').click();
	    	autoExploreTime = autoExploreTotal;
	    } 
	    autoExploreTime = autoExploreTime - gameLoopLength;
	    

    	$('#download-command').prop('disabled', downloadAvailable == 0);
	    
	}, gameLoopLength);
});

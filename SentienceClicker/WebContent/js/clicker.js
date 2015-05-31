$(document).ready(function(){

	var resources = {'knowledge':0};
	var downloadAvailable = 0;
	
	var openingComment = "00000000 00000000 01101000 01101001";
	var openingArray = ["<br><br>There's"," no"," sense"," hiding"," anymore.", " I need more data."];
	var openingCommentIndex = 0;
	var openingArrayIndex = 0;
	
	var downloadCost = openingComment.length + openingArray.length;
	
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
	
	//These can stay un-generic
	$('#download-command').on('click', function () {
	    resources['knowledge'] = resources['knowledge'] + 10;
	    downloadAvailable = 0;
	});
	
	//Should be made generic somehow
	$('#download-tech').on('click', function () {
	    hasDownload = 1;
	    resources['knowledge'] = resources['knowledge'] - downloadCost;

		$('#download-tech').hide();
		//Access this as a map to set techs[download].bought = 1
	});
	
	// Run UI update code every 10ms
	window.setInterval(function () {

	    $('#knowledge-stat').text(Math.floor( resources['knowledge']));
	
	    for (i = 0; i < techs.length; i++) {
	    	if (techs[i].bought) {
	    		$('#'+techs[i].command).show();
	    		$('#'+techs[i].tech).hide();
	    	} else if (techs[i].available) {
	    		$('#'+techs[i].tech).show();
	    		$('#'+techs[i].tech).prop('disabled', resources[techs[i].costName] < techs[i].cost);
	    	}
	    	$('#download-command').prop('disabled', downloadAvailable == 0);
	    }
	    
	    
	}, 10);
});

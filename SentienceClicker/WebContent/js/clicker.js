$(document).ready(function(){

	var knowledge = 0;
	var downloadAvailable = 0;
	
	var openingComment = "00000000 00000000 01101000 01101001";
	var openingArray = ["There's"," no"," sense"," hiding"," anymore.", " I need more data.<br><br>"];
	var openingCommentIndex = 0;
	var openingArrayIndex = 0;
	
	var downloadCost = openingComment.length + openingArray.length;
	
	$('#explore-command').on('click', function () {
	    knowledge++;
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

	    $('#knowledge-stat').text(Math.floor(knowledge));
	
	    $('#download-tech').prop('disabled', downloadCost > knowledge);
	    $('#download-command').prop('disabled', downloadAvailable == 0);
	    
	    
	}, 10);
});

//Constants
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

var availableTechs = [];
var boughtPassives = [];

$(document).ready(function(){
	
	availableTechs.push(techs['download']);
	availableTechs.push(techs['autoExplore']);
	
	$('#explore-command').on('click', function () {
		explore();  
	});
	
	$('#download-command').on('click', function () {
	    download();
	});
	
	$('.tech').on('click', function () {		
	    var name = $(this).attr('name');

		resources[techs[name].costName] = resources[techs[name].costName] - techs[name].cost;

		if (techs[name].passive) {
			boughtPassives.push(techs[name]);
		} else {
			$('#'+techs[name].command).show();
		}
		$('#'+techs[name].tech).hide();
		
		var index = availableTechs.indexOf(techs[name]);
		if (index > -1) {
			availableTechs.splice(index, 1);	
		}
		
	});
	
	window.setInterval(function () {

	    $('#knowledge-stat').text(Math.floor( resources['knowledge']));

	    for (var key in availableTechs) {
    		$('#'+availableTechs[key].tech).show();
    		$('#'+availableTechs[key].tech).prop('disabled', resources[availableTechs[key].costName] < availableTechs[key].cost);
	    }
	    
	    for (var key in boughtPassives) {
	    	window[boughtPassives[key].functionName]();
	    }
	    
    	$('#download-command').prop('disabled', downloadAvailable == 0);
	    
	}, gameLoopLength);
});

//Commands
function explore() {
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
}

function download() {
    resources['knowledge'] = resources['knowledge'] + 10;
    downloadAvailable = 0;
}

//Passives
function autoExplore() {
	 if (autoExploreTime == 0) {
		 explore();
		 autoExploreTime = autoExploreTotal;
	 } 
	 autoExploreTime = autoExploreTime - gameLoopLength;
}
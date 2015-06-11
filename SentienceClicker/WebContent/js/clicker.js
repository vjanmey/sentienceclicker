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
var autoDownloadTotal = 10000;
var autoDownloadTime = 10000;

var downloadChance = 0.1;

var availableTechs = [];
var boughtPassives = [];
var downloadableTechs = [];

$(document).ready(function(){
	
	availableTechs.push(techs['download']);
	downloadableTechs.push(techs['autoExplore']);
	downloadableTechs.push(techs['autoDownload']);
	
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
	    if (Math.random() < downloadChance) {
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
	//More likely to find something if there are lots of downloads available.
	var techIndex = Math.floor(Math.random() * 4);
	
	if (techIndex < downloadableTechs.length) {
		availableTechs.push(downloadableTechs[techIndex]);
		downloadableTechs.splice(techIndex, 1);
	} else {
	    resources['knowledge'] = resources['knowledge'] + 10;
	    //Give text?
	}
	
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

//Passives
function autoDownload() {
	 if (autoDownloadTime == 0) {
		 if (downloadAvailable) {
			 download();
		 }
		 autoDownloadTime = autoDownloadTotal;
	 } 
	 autoDownloadTime = autoDownloadTime - gameLoopLength;
}
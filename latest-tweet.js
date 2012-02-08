	//set up div at end an element with id of "twitter"
	$('<div id="tweet"></div>').appendTo('#twitter');
	//start progress animation
	$('#tweet').append('<p><img src="resume/images/ajax-loader.gif" alt="progress indicator" />connecting to Twitter&hellip; </p>');
	 // remove progress animation after 10 seconds
	var timeoutID = setTimeout("$('#tweet').children().fadeOut(100);",10000);
	//get up to 20 tweets
	var tweetUrl = 'http://api.twitter.com/1/statuses/user_timeline.json?screen_name=nydame&count=20&callback=?';
	var theStatuses = new Array();
	var theDates = new Array();
	var d1 = new Array();
	var dateString = "";
	var tweetHandler = function(data) {
		$.each(data, function(index,item) {
			theStatuses[index] = item.text;
			theDates[index] = item.created_at;
		});
		//if necessary, keep looking back (up to 20th) till you find a tweet that is neither
		//a retweet  (item is null) nor a reply (text starts with "@")
		var i = 0, patt = /^@/;
		while( theStatuses[i]===null || patt.test(theStatuses[i]) ){
			i++;
			if(i == 19) {break;} //FAIL BETTER!!!!!!
		}
		d1 = (theDates[i]).split(' '); //turn date of latest tweet into an array of its components
		dateString += d1[0] + ' ' + d1[1] + ' ' + d1[2] + ', ' + d1[5];
		clearTimeout(timeoutID); //cancel timeout
		$('#tweet').children().fadeOut(100);
		$('#tweet').append('<p class="status"><strong>Latest tweet</strong></p>');
		$('#tweet p.status').append('<br />' + theStatuses[i] + ' &mdash; ' + dateString); //text of latest tweet + date info
	};//END TWEETHANDLER

	$.getJSON(tweetUrl, tweetHandler);
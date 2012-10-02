//jQuery plugin (wrapped in a self-invoking function) fetches latest tweet
(function($){
	$.fn.latestTweet = function(username, num) {
		if(!username || username === "") {username="nydame";} // default is me :P
		if(!num || num<=0) {num = 20;} // default is 20
		var $orig = this;
		var tweetString = "",
		tweetUrl = 'http://api.twitter.com/1/statuses/user_timeline.json?callback=?';
		function tweetHandler(data) {
			if(!data || data.length <= 0) {return $orig;} //FAIL BETTER!!!!!!
			var d1 = [],
			dateString = "",
			i = 0, //index of latest tweet
			patt = /^@/;
			//filter out retweets (null text) and replies (starts w @)
			try {
				while( data[i].text===null || patt.test(data[i]) ) {
					i++;
					if( i == num ) {break;} 
				}
			} catch(e1) {
				return $orig; //FAIL BETTER!!!!!!
			}
			if( i == num ) {return $orig;} //FAIL BETTER!!!!!!!
			//with value of i set, compose text
			//1st turn date of latest tweet into an array of its components
			try {
				d1 = (data[i].created_at).split(' ');
				dateString += ' &mdash;&nbsp;'  + d1[0] + ' ' + d1[1] + ' ' + d1[2] + ', ' + d1[5];
			} catch(e2) {
				return $orig; //FAIL BETTER!!!!!!!!
			}
			tweetString += data[i].text + dateString;
			//finally, display tweet and return caller
			if( tweetString !== "" && document.getElementById('twitter') ) {
				$('#twitter').empty();
				$('<div id="tweet"><p class="status"><strong>Latest tweet</strong><br /></p></div>').appendTo('#twitter');
				$('#tweet p.status').append(tweetString);
			}
		} //end tweetHandler 
		//fetch latest tweet
		$.getJSON(
			tweetUrl,
			{count:num, screen_name:username},
			tweetHandler
		);
		return $orig;
	}; //end plugin
})(jQuery);

//call plugin usig no-conflict wrapper recommended in WP Codex
jQuery(document).ready(function($) {
    // $() will work as an alias for jQuery() inside of this function
	$(document).latestTweet(); //default username and number to search
});

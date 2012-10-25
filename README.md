### Welcome!

Latest Tweet is (thus far) a bare bones jQuery plugin that displays the most recent tweet of a given entity on Twitter on a website.  The username and the number of tweets to search for a valid tweet can be supplied as parameters.  Valid tweets are neither retweets nor replies (i.e., tweets starting with "@").  If no valid tweets are found, nothing is displayed.

Eventually a WordPress plugin will be developed. 

To use 
1. Create a div with id="twitter" in your markup to contain the tweet.
2. Download latest-tweet.js or latest-tweet-min.js. and open it in a text editor.
3. Find 
		latestTweet();
near the very end of the code and change it to
		latestTweet("twittername");
where **twittername** is the desired Twitter account name.  And the quote marks are essential, by the way! If you would like to change the number of tweets that are searched from the default value of 20, add that as a second parameter.  For example,
		latestTweet("twitterhandle", 10);
A large value may be desirable for someone who retweets a lot.
4. Finally upload the resulting code to your website, either as a separate file or added to an existing javascript file.

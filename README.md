MooTube
=======

Takes advantage of Youtube Iframe api to ease make use of it.

How to use
----------
	
	As a simple example, you could use the following lines at Document Head:
	
	<html>
		<head>
			<title>MooTube example</title>
			<script type="text/javascript" src="mootools-core.js" />
			<script rel="javascript" src="mootube.js"></script>
			<script rel="javascript" src="mootube.player.js"></script>
			
			[... whatever else you have in your document head]
		</head>
		
		<body>
			<h1>Youtube Iframe API with MooTools</h1>
			<div id="player"></div>
			
			[... whatever else code you have in your document body]
		</body>
	</html>
	
	
	Youtube Iframe API documentation at:
	https://developers.google.com/youtube/iframe_api_reference
	
How to use
----------
	
	First you need to create an instance of MooTube, which loads the Youtube Iframe API.
	var mootube = new MooTube({
		onReady: function() {
			// Youtube Iframe API is ready to go!
		}
	});
	
	Once the API is loaded and ready, you can create players on any element in the DOM.
	var player = mootube.player('player', {
		video_id: 'OuoytdFfyXs',
		width: 800,
		height: 600,
		playerVars: {
			autoplay: 1,
			theme: 'light'
		},
		// onReady EVENT
		onReady: function() {
			// Video player is ready to listen calls
		}
	});
	
	You can see the complete list of player variables to place in 'playerVars' option at:
	https://developers.google.com/youtube/player_parameters?playerVersion=HTML5

FUNCTIONS
---------
	
	Every player has the same functions than API, since these are mapped to the Player class.
	
	To read about functions and their parameters, documentation:
	https://developers.google.com/youtube/iframe_api_reference#Functions
	
EVENTS
------	
	
	Every player support same events than API, since these are mapped to the Player class.
	
	var player = mootube.player('player', {
		video_id: 'OuoytdFfyXs',
		// Events
		onReady: function(event) {
			// Do something
		},
		onStateChange: function(event) {
			// Do something
		},
		onPlaybackQualityChange: function(event) {
			// Do something
		},
		onPlaybackRateChange: function(event) {
			// Do something
		},
		onError: function(event) {
			// Do something
		}
	});
	
	To read about events, documentation:
	https://developers.google.com/youtube/iframe_api_reference#Events
	
Donations
---------
	
	Donations are welcome. By donating you contribute to this and other Open Source efforts.
window.addEvent('domready', function() {
	
	window.yt = new MooTube({
		// Youtube Iframe API ready.
		onReady: function() {
			
			// Create a video player on container element
			window.video1 = yt.player('container', {
				// When video player ready to listen calls
				onReady: function() {
					console.log('I am ready!');
				}
			});
			
		}
	});
	
	
});
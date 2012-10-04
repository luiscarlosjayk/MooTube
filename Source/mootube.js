/*
---

name: MooTube

description: Provides an easier way to make use of Youtube Iframe API

license: MIT-style license

authors:
  - Ciul

requires: [Core/Class, Core/Object]

provides: [MooTube]

...
*/

// Create MooTube closure
(function($) { // Dollar Safe Mode
	
	this.$MooTube = {
		Mixins:	{}
	};
	
})(document.id);


// MooTube Base Class
(function($) { // Dollar Safe Mode
	var $global = this;
	
	var MooTube = $MooTube.MooTube = $global.MooTube = new Class({
		Implements: [Events, Options],
	
	// options
		options: {
			
		},
		
	// Properties	
		$ready: false,
		$players: {},
		
		/**
		 * initialize
		 */
		initialize: function(options) {
			this.setOptions(options);
			
			// Create onYouTubeIframeAPIReady function
			$global.onYouTubeIframeAPIReady = function() {
				this.$ready();
			}.bind(this);
			
			// Include Youtube Iframe script asynchronously
			var script = new Element('script', {
				src: '//www.youtube.com/iframe_api'
			}).inject(document.head);
			
			return this;
		},
		
		/**************************************************************
		 * PRIVATE METHODS
		 **************************************************************/
		
		/**
		 * $ready
		 */
		$ready: function() {
			this.$ready = true;
			this.fireEvent('ready');
		},
		
		/**************************************************************
		 * PUBLIC METHODS
		 **************************************************************/
		
		/**
		 * player
		 */
		player: function(element, options) {
			element = $(element);
			options = options || {};
			
			if (!Type.isElement(element))
				return null;
			
			// Retrieve MooTube Player of Element
			var player = element.retrieve('mootube.player');
			
			// If Element already has a Player, return this.
			if (player)
				return player;
			
			// If Element doesn't have a Player, create one and return it;
			player = new $MooTube.Player(element, options);
			return player;
		},
		
		/**
		 * removePlayer
		 */
		removePlayer: function(element) {
			element = $(element);
			
			if (!Type.isElement(element))
				return null;
			
			var player = element.retrieve('mootube.player');
			
			if (player) {
				player.destroy();
				return true;
			}
			
			return false;
		}
		
	});
	
})(document.id);
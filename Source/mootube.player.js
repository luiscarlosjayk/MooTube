/*
---

name: MooTube.Player

description: Provides an easier way to make use of Youtube Iframe API

license: MIT-style license

authors:
  - Ciul

requires: [Core/Class, Core/Object]

provides: [MooTube.Player]

...
*/

/**************************************************************
 * PLAYER MAPPING MIXIN CLASS
 **************************************************************/
(function($) { // Dollar Safe Mode
	
	var PlayerMappingMixin = this.$MooTube.Mixins.PlayerMappingMixin = new Class({
		
		$initMapping: function() {
			var $self = this;
			var PlayerMapping = $self.$PlayerMapping || {};
			// Map Functions
			var functionsObject = PlayerMapping.functions || {};
			Object.each(functionsObject, function(_function, subObject) {
				$self.$mapFunction(_function, subObject);
			});
			
			// Map Events
			var eventsObject = PlayerMapping.events || {};
			Object.each(eventsObject, function(_event, subObject) {
				$self.$mapEvent(_event, subObject);
			});
		},
		
		// MapFunction method
		$mapFunction: function(_function, subObject) {
			var $self = this;
			
			subObject = !!eval(subObject) ? eval(subObject) : null;
			if (!subObject)
				return null;
			
			Object.each(_function, function(mappedName, name) {
				mappedName = mappedName != null ? mappedName : name;
				
				$self[mappedName] = function() {
					return subObject[name].apply(subObject, Array.from(arguments));
				}
			});
			
		}.protect(),
		
		// MapEvent method
		$mapEvent: function(_event, subObject) {
			var $self = this;
			
			subObject = !!eval(subObject) ? eval(subObject) : null;
			if (!subObject)
				return null;
			
			Object.each(_event, function(mappedEvent, name) {
				var mappedEventFn = !!eval($self[mappedEvent]) ? eval($self[mappedEvent]) : null;
				if (!mappedEventFn)
					return;
				
				subObject.addEventListener(name, function(event) {
					$self[mappedEvent].apply($self, Array.from(event));
				});
			});
			
		}.protect()
		
	});
	
})(document.id);

/**************************************************************
 * PLAYER CLASS
 **************************************************************/

(function($) { // Dollar Safe Mode
	var $global = this;
	
	// Mapping
	var PlayerMapping = {
		// mapped functions
		functions: {
			'this.$player': {
				/**
				 * Queueing functions
				 */
				cueVideoById:				null,
				cueVideoByUrl:				null,
				loadVideoById:				null,
				loadVideoByUrl:				null,
				/**
				 * Playback controls and player settings
				 */
				playVideo:					null,
				pauseVideo:					null,
				stopVideo:					null,
				seekTo:						null,
				clearVideo:					null,
				/**
				 * Queueing functions for lists
				 */
				cuePlaylist:				null,
				loadPlaylist:				null,
				/**
				 * Playing a video in a playlist
				 */
				nextVideo:					null,
				previousVideo:				null,
				playVideoAt:				null,
				/**
				 * Changing the player volume
				 */
				mute:						null,
				unMute:						null,
				isMuted:					null,
				setVolume:					null,
				getVolume:					null,
				/**
				 * Setting the player size
				 */
				setSize:					null,
				/**
				 * Setting the playback rate
				 */
				getPlaybackRate:			null,
				setPlaybackRate:			null,
				getAvailablePlaybackRates:	null,
				/**
				 * Setting playback behavior for playlists
				 */
				setLoop:					null,
				setShuffle:					null,
				/**
				 * Playback status
				 */
				getVideoLoadedFraction:		null,
				getVideoStartBytes:			null,
				getPlayerState:				null,
				getCurrentTime:				null,
				/**
				 * Playback quality
				 */
				getPlaybackQuality:			null,
				setPlaybackQuality:			null,
				suggestedQuality:			null,
				getAvailableQualityLevels:	null,
				/**
				 * Retrieving video information
				 */
				getDuration:				null,
				getVideoUrl:				null,
				getVideoEmbedCode:			null,
				/**
				 * Retrieving playlist information
				 */
				getPlaylist:				null,
				getPlaylistIndex:			null,
				/**
				 * Accessing and modifying DOM nodes
				 */
				getIframe:					null,
				destroy:					null
			}
		},
		// mapped events
		events: {
			'this.$player': {
				onReady:					'$ready',
				onStateChange:				'$statechange',
				onPlaybackQualityChange:	'$playbackqualitychange',
				onPlaybackRateChange:		'$playbackratechange',
				onError:					'$error'
			}
		}
	};
	
	// Player Mapping Mixin
	var PlayerMappingMixin = this.$MooTube.Mixins.PlayerMappingMixin;
	
	var Player = $global.$MooTube.Player =  new Class({
		Implements: [PlayerMappingMixin, Events, Options],
		
	// options
		options: {
			videoId:	'u1zgFlCw8Aw',
			width:		640,
			height:		390,
			playerVars: {}
			/**
			 * For a complete list of youtube player variables go to:
			 * https://developers.google.com/youtube/player_parameters?playerVersion=HTML5
			 */
		},
		
	// properties
		$player: null,
		
		/**
		 * initialize
		 */
		initialize: function(element, options) {
			this.setOptions(options);
			
			element = $(element);
			if (!Type.isElement(element))
				return null;
			
			// Prepares element to receive the player iframe
			element.empty();
			var playerElementId = element.getProperty('id').concat('-mootube');
			var playerElement = new Element('div', {
				id: playerElementId
			}).inject(element);
			
			// Set PlayerMapping object
			this.$PlayerMapping = PlayerMapping;
			
			// Create Youtube Player
			this.$player = new YT.Player(playerElementId, this.options)
			
			// Map YT.Player functions
			this.$initMapping();
			
			// Store mootube.player in element
			element.store('mootube.player', this);
			return this;
		},
		
		/**************************************************************
		 * PRIVATE METHODS
		 **************************************************************/
		
		/**************************************************************
		 * EVENT METHODS
		 **************************************************************/
		
		/**
		 * $ready
		 */
		$ready: function(event) {
			this.fireEvent('ready', event);
		},
		
		/**
		 * $statechange
		 */
		$statechange: function(event) {
			// console.log('here ', this);
			this.fireEvent('stateChange', event);
		},
		
		/**
		 * $playbackqualitychange
		 */
		$playbackqualitychange: function(event) {
			this.fireEvent('playbackQualityChange', event);
		},
		
		/**
		 * $playbackratechange
		 */
		$playbackratechange: function(event) {
			this.fireEvent('playbackRateChange', event);
		},
		
		/**
		 * $error
		 */
		$error: function(event) {
			this.fireEvent('error', event);
		},
		
		/**************************************************************
		 * PUBLIC METHODS
		 **************************************************************/
		
	});
	
})(document.id);
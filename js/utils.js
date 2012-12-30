define([
	'jquery',
	'underscore',
	'backbone'
], function($, _, Backbone){

	var Utils = {

		//create event bus for view-view communication
		events: _.extend({}, Backbone.Events),

		starify: function(msg)
		{
			return "***"+msg+"***";
		}

	}

	return Utils;
});
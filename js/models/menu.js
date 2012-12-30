// Filename: models/menumodel
define([
		'underscore',
		'backbone'
], function(_, Backbone){

	var MenuModel = Backbone.Model.extend({
		defaults: {
			menuItems: ["Home", "Pictures", "About"]
		},

		initialize: function() {

		}
	});

	// Return the model for the module
	return MenuModel;
});
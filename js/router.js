define([
	'jquery', 
	'backbone', 
	'underscore', 
	'views/filmview',
	'views/menuview',
	'tomatoes',
	'views/libraryview'
], function($, Backbone, _, FilmView, MenuView, Tomatoes, LibraryView) {

	var Router = Backbone.Router.extend({

		initialize: function() {

			this.libraryView = new LibraryView();
			this.libraryView.render();

			Backbone.history.start();
		},

		routes: {
			'': 				'home',
			'home': 			'home',
			'search/:query': 	'search' 
		},

		home: function() {
			//this.filmView.render();
		},

		search: function(query) {
			console.log(query);
		}
	});

	return Router;
});
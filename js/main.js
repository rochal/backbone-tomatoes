require.config({

	baseUrl: 'js',
	paths: {
		jquery: 'libs/jquery',
		underscore: 'libs/underscore',
		backbone: 'libs/backbone',
		handlebars: 'libs/handlebars',
		bootstrap: 'libs/bootstrap',
		text: 'libs/text'
	},
	shim: 
	{
		backbone: {
			'deps': ['jquery', 'underscore'],
			'exports': 'Backbone'
		},
		underscore: {
			'exports': '_'
		},
		handlebars: {
			'exports': 'Handlebars'
		}
	}
});

require([

  // Load our app module and pass it to our definition function
  'app',
], function(App) {

  // The "app" dependency is passed in as "App"
  App.init();

});
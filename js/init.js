require.config({

  // path to javascript files
  baseUrl: 'js',

  // define shortcuts to libraries
  paths: {
    jquery:       'libs/jquery',
    underscore:   'libs/underscore',
    backbone:     'libs/backbone',
    handlebars:   'libs/handlebars',
    bootstrap:    'libs/bootstrap',
    text:         'libs/text',
    'backbone.localStorage': 'lib/backbone.localStorage'
  },

  // handle non-AMD compatible modules
  shim:
  {
    backbone: {
      deps: ['jquery', 'underscore'],
      exports: 'Backbone'
    },
    underscore: {
      exports: '_'
    },
    handlebars: {
      exports: 'Handlebars'
    },
    'backbone.localStorage': {
      deps: ['backbone'],
      exports: 'Backbone'
    }
  }
});

// load main application
require([
  'underscore',
  'app',
], function(_, App) {

  // initialise the main application
  App.init();

});

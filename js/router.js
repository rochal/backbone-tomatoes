define([
  //libs
  'backbone', 
  //views
  'views/mainview'
], function(Backbone, MainView) {

  var Router = Backbone.Router.extend({

    initialize: function() {

      // create main application view
      this.mainView = new MainView();
      this.mainView.render();

      // start listening for hash change
      Backbone.history.start();
    },

    routes: {
      'search/:query':   'search' 
    },

    search: function(query) {
      //nothing to see here yet!
      console.log(query);
    }
  });

  return Router;
});
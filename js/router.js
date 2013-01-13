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
      '':               'newrelease',
      'search/:query':  'search',
      'fav':            'favourite'
    },

    search: function(query) {
      //nothing to see here yet!
      console.log(query);
    },

    newrelease: function() {
      var films = this.mainView.model.get('filmcollection').getWithRating();
      this.mainView.model.set('films', films);
    },

    favourite: function() {
      var films = this.mainView.model.get('filmcollection').getFavourite();
      this.mainView.model.set('films', films);
    }
  });

  return Router;
});
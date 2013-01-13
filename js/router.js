define([
  // libs
  'backbone',
  // views
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
      // nothing to see here yet!
      console.log(query);
    },

    newrelease: function() {

      // get latest releases and update the list of films to display
      var films = this.mainView.model.get('films').getWithRating();
      this.mainView.model.set('displayfilms', films);
    },

    favourite: function() {

      // get user favourites and update the list of films to display
      var films = this.mainView.model.get('films').getFavourite();
      this.mainView.model.set('displayfilms', films);
    }
  });

  return Router;
});
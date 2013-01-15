define([
  'tomatoes',
  // libs
  'backbone',
  // views
  'views/mainview',
  'views/menuview'
], function(Tomatoes, Backbone, MainView, MenuView) {

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
      'new':            'newrelease',
      'search/:query':  'search',
      'fav':            'favourite'
    },

    search: function(query) {
      //nothing to see here yet!
      console.log(query);
    },

    newrelease: function() {
      var films = Tomatoes.films.getWithRating();
      this.mainView.model.set('displayfilms', films);

      // trigger an event to update the menu
      Tomatoes.events.trigger('router:change', Backbone.history.fragment);
    },

    favourite: function() {
      var films = this.mainView.model.get('favs').getWithRating();
      this.mainView.model.set('displayfilms', films);

      // trigger an event to update the menu
      Tomatoes.events.trigger('router:change', Backbone.history.fragment);
    }
  });

  return Router;
});
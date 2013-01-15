define([
  'tomatoes',
  // libs
  'underscore',
  'backbone'
], function(Tomatoes, _, Backbone){

  var FilmModel = Backbone.Model.extend({

    defaults: {
      isFavourite: false
    },

    initialize: function() {
    },

    // marks film as favourite
    toggleFavourite: function() {
      var isFav = this.get("isFavourite");
      this.set("isFavourite", !isFav);

      // toggle global event so we can add it to favs collection
      Tomatoes.events.trigger('model:isFavourite:toggle', this);
    }
  });

  return FilmModel;
});
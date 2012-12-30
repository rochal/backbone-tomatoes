define([
  'underscore',
  'backbone'
], function(_, Backbone){

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
    }
  });

  return FilmModel;
});
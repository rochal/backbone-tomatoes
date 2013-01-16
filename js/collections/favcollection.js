// Filename: models/book
define([
  'tomatoes',
  'underscore',
  'backbone',
  'collections/filmcollection'
], function(Tomatoes, _, Backbone, FilmCollection){

  var FavCollection = FilmCollection.extend({

    addFilm: function(flag) {
      Tomatoes.events.trigger('fav:collection:add', this);
    },

    removeFilm: function(flag) {
      Tomatoes.events.trigger('fav:collection:remove', this);
    }

  });

  return FavCollection;
});
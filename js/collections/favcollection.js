// Filename: models/book
define([
  // libs
  'tomatoes',
  'underscore',
  'backbone',
  'localstore',
  'models/film'
], function(Tomatoes, _, Backbone, Store, Film){

  var FavCollection = Backbone.Collection.extend({

    model: Film,

    localStorage: new Backbone.LocalStorage("FavsCollection"),

    initialize: function() {

      // add listeners
      this.bind('add', this.addFilm, this);
      this.bind('remove', this.removeFilm, this);
    },

    addFilm: function(film) {
      Tomatoes.events.trigger('fav:collection:add', this);
    },

    removeFilm: function(film) {
      Tomatoes.events.trigger('fav:collection:remove', this);
    },

    getWithRating: function() {
       return this.filter(function(film){ return film.get('ratings').critics_score >= 0 })
    },

  });

  return FavCollection;
});
// Filename: models/book
define([
  'tomatoes',
  'underscore',
  'backbone',
  'models/film'
], function(Tomatoes, _, Backbone, Film){

  var FilmCollection = Backbone.Collection.extend({

    model: Film,

    initialize: function() {
      this.bind('add', this.addFilm, this);
      this.bind('remove', this.removeFilm, this);
    },

    addFilm: function(flag) {
      Tomatoes.events.trigger('collection:filmcollection:add', this);
    },

    removeFilm: function(flag) {
      Tomatoes.events.trigger('collection:filmcollection:remove', this);
    },

    getBeforeYear: function(year) {
      return this.filter(function(film){ return film.get('year') < year });
    },

    getBetterThanScore: function(score) {
      return this.filter(function(film){ return film.get('ratings').critics_score >= score });
    },

    sortByYear: function() {
      return this.sortBy('year');
    },

    getGoodByYear: function() {
      return this.filter(function(film){ return film.get('ratings').critics_score >= 50 })
    },

    getWithRating: function() {
       return this.filter(function(film){ return film.get('ratings').critics_score >= 0 })
    },

    getFavourite: function() {
      return this.where({ isFavourite: true })
    }

  });

  return FilmCollection;
});
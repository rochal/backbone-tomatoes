// Filename: models/book
define([
  'underscore',
  'backbone',
  'models/film'
], function(_, Backbone, Film){

  var FilmCollection = Backbone.Collection.extend({

    model: Film,

    //get movies older than year
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

  // Return the model for the module
  return FilmCollection;
});
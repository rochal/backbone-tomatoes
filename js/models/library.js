// Filename: models/library
define([
    'underscore',
    'backbone',
    'collections/filmcollection',
    'models/film'
], function(_, Backbone, FilmCollection, Film){

  var LibraryModel = Backbone.Model.extend({

    initialize: function() {

      var films = new FilmCollection();

      _.each(movie_data.movies, function(value, index) {
        films.add(new Film(value));
      });

      this.set('films', films);
    }
  });

  // Return the model for the module
  return LibraryModel;
});
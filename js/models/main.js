define([
  //libs
  'underscore',
  'backbone',
  //collections
  'collections/filmcollection',
  //models
  'models/film'
], function(_, Backbone, FilmCollection, Film){

  var MainModel = Backbone.Model.extend({

    initialize: function() {

      //create initial collection from the provided data
      var films = new FilmCollection();

      _.each(movie_data.movies, function(value, index) {
        films.add(new Film(value));
      });

      this.set('filmcollection', films);
    }
  });

  return MainModel;
});
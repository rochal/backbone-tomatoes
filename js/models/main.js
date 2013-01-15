define([
  'tomatoes',
  // libs
  'underscore',
  'backbone',
  // models
  'models/film',
  // collections
  'collections/filmcollection'
], function(Tomatoes, _, Backbone, Film, FilmCollection){

  var MainModel = Backbone.Model.extend({

    initialize: function() {

      // create initial collection from the provided load-time data
      var films = new FilmCollection();
      _.each(movie_data.movies, function(value, index) {
        films.add(new Film(value));
      });
      Tomatoes.films = films;
      this.set('displayfilms', films.getWithRating());

      // create favourites collection
      this.set('favs', new FilmCollection());

      // listen for favourite toggle
      Tomatoes.events.on('model:isFavourite:toggle', this.toggleFilmFav, this);
    },

    toggleFilmFav: function(film) {

      // get favourite collection
      var favs = this.get('favs');
      var model = favs.get(film);

      if (!model)
      {
        favs.add(film);
      } else {
        favs.remove(film);
      }
      this.set('favs', favs);
    }

  });

  return MainModel;
});
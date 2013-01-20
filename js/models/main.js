define([
  'tomatoes',
  // libs
  'underscore',
  'backbone',
  // models
  'models/film',
  // collections
  'collections/filmcollection',
  'collections/favcollection'
], function(Tomatoes, _, Backbone, Film, FilmCollection, FavCollection){

  var MainModel = Backbone.Model.extend({

    initialize: function() {

      // create initial collection from the provided load-time data
      Tomatoes.films = new FilmCollection();

      _.each(movie_data.movies, function(value, index) {
        Tomatoes.films.add(new Film(value));
      });

      // we'll use this to store currently displayed collection of films
      this.set('films', Tomatoes.films.getWithRating());

      // create favourites collection
      var favs = new FavCollection();
      favs.fetch();
      Tomatoes.events.trigger('fav:collection:update', favs);
      this.set('favs', favs);


      // listen for favourite toggle
      Tomatoes.events.on('model:isFavourite:toggle', this.toggleFilmFavourite, this);
    },

    toggleFilmFavourite: function(film) {

      // add or remove the film from the colelction
      var favs = this.get('favs'),
          model = favs.get(film);

      // add to the collection of model is not there yet, remove otherwise
      // if (!model) {
      //   favs.add(film);
      // } else {
      //   favs.remove(film);
      // }
      //favs.add(film);
      //film.collection = favs;
      favs.create(film);
      //console.log(film.collection);
      favs.localStorage.save();
      //update favourites collection
      //this.set('favs', favs);
    }

  });

  return MainModel;
});
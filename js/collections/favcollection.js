// Filename: models/book
define([
  // libs
  'tomatoes',
  'underscore',
  'backbone',
  'localstore',
  'collections/filmcollection'
], function(Tomatoes, _, Backbone, Store, FilmCollection){

  var FavCollection = FilmCollection.extend({

    localStorage: new Store("FavsCollection"),

    addFilm: function(flag) {
      Tomatoes.events.trigger('fav:collection:add', this);
      this.localStorage.save();
    },

    removeFilm: function(flag) {
      Tomatoes.events.trigger('fav:collection:remove', this);
      this.localStorage.save();
    }

  });

  return FavCollection;
});
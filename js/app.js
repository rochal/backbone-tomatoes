define([
  'tomatoes',
  'router',
  // collections
  'collections/filmcollection'
], function(Tomatoes, Router, FilmCollection){

  var init = function(){

    // create application router
    Tomatoes.router = new Router();
  };

  return { init: init };
});
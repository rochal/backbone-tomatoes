define([
  'router',
  'collections/filmcollection'
], function(Router, FilmCollection){

  var init = function(){

    // create application router
    this.router = new Router();
  };

  return { init: init };
});
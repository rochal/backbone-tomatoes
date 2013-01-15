define([
  // libs
  'jquery',
  'underscore',
  'backbone'
], function($, _, Backbone){

  // static object persistent across all views/models
  var Tomatoes = {

    // create global event bus to pass messages around
    events: _.extend({}, Backbone.Events),

    // create collection to store film data
    films: new Backbone.Collection(),

    apikey: "rr2bbrpffzsbzz6efjy4r89v",

    baseUrl: "http://api.rottentomatoes.com/api/public/v1.0",

    getMoviesSearchUrl: function() {
      return this.baseUrl + '/movies.json?apikey=' + this.apikey;
    },

    search: function(query, callback) {
      var self = this;

      // send off the query
      $.ajax({
        url: self.getMoviesSearchUrl() + '&q=' + encodeURI(query),
        dataType: "jsonp",
        success: callback
      });
    }
  };

  return Tomatoes;
});
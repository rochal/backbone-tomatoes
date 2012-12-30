define([
    'jquery'
], function($){

  var Tomatoes = function() {

    var apikey = "rr2bbrpffzsbzz6efjy4r89v",
      baseUrl = "http://api.rottentomatoes.com/api/public/v1.0";
    var moviesSearchUrl = baseUrl + '/movies.json?apikey=' + apikey;

    this.search = function(query, callback) {
      // send off the query
      $.ajax({
        url: moviesSearchUrl + '&q=' + encodeURI(query),
        dataType: "jsonp",
        success: callback
      });
    }
  }

  return Tomatoes;
});
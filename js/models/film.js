// Filename: models/filmmodel
define([
    'underscore',
    'backbone'
], function(_, Backbone){

  var FilmModel = Backbone.Model.extend({

    defaults: {
      votes: 0
    },

    initialize: function() {

    },

    rateIt: function() {
      var votes = this.get("votes") + 1;
      this.set("votes", votes);
    }
  });

  // Return the model for the module
  return FilmModel;
});
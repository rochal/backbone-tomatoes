// Filename: models/menumodel
define([
    'underscore',
    'backbone'
], function(_, Backbone){

  var MenuModel = Backbone.Model.extend({
    defaults: {
      totalFav: 0, 
      totalTop: 0
    },

    initialize: function() {

    }
  });

  // Return the model for the module
  return MenuModel;
});
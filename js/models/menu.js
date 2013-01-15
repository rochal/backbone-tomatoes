// Filename: models/menumodel
define([
    'tomatoes',
    'underscore',
    'backbone'
], function(Tomatoes, _, Backbone){

  var MenuModel = Backbone.Model.extend({
    defaults: {
      totalFav: 0,
      totalTop: 0
    },

    initialize: function() {

      // listen for favourite change and update the total
      Tomatoes.events.on('collection:filmcollection:add collection:filmcollection:remove',
        this.updateTotals, this);
    },

    updateTotals: function(filmCollection) {
      // update total number of favourites
      this.set('totalFav', filmCollection.length);
    }

  });

  // Return the model for the module
  return MenuModel;
});
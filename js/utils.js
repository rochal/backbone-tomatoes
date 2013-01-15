define([
  //libs
  'underscore',
  'backbone'
], function(_, Backbone){

  var Utils = {

    starify: function(msg)
    {
      return "***"+msg+"***";
    }
  }

  return Utils;
});
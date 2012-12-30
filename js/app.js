define([
  'jquery',
  'underscore',
  'backbone',
  'router'
], function($, _, Backbone, Router){

  var init = function(){

    this.router = new Router();
  };

  return { init: init};
});
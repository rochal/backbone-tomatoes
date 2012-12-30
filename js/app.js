define([
  'router'
], function(Router){

  var init = function(){

  	// create application router
    this.router = new Router();
  };

  return { init: init};
});
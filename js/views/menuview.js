define([
  //libs
  'jquery',
  'backbone',
  'handlebars',
  'utils',
  //models    
  'models/menu',
  //templates
  'text!templates/menu.html'
], function($, Backbone, Handlebars, Utils, Menu, MenuTemplate){

  var MenuView = Backbone.View.extend({

    events: {
      'click #editMovies': 'editMovies'
    },

    render: function() {

      var template = Handlebars.compile(MenuTemplate);
      var html = template(this.model.toJSON());
      this.$el.html(html);

      return this;  
    },

    initialize: function() {
      this.model = new Menu();
      this.listenTo(this.model, "change", this.render);
    },

    editMovies: function() {
      Utils.events.trigger("film:edit", this.model);
    }

  });

  return MenuView;
});
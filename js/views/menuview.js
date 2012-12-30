define([
  //libs
  'jquery',
  'backbone',
  'handlebars',
  'utils',
  'tomatoes',
  //models    
  'models/menu',
  //templates
  'text!templates/menu.html'
], function($, Backbone, Handlebars, Utils, Tomatoes, Menu, MenuTemplate){

  var MenuView = Backbone.View.extend({

    events: {
      'click #editMovies':  'editMovies',
      'click #searchBtn':   'search'
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
    },

    search: function() {
      var value = this.$el.find("#searchInput").val(),
          self = this;

      var tomatoe = new Tomatoes();

      tomatoe.search(value, function(data) {
        self.trigger('film:updateall', data);
      });
    }

  });

  return MenuView;
});
define([
  'tomatoes',
  //libs
  'jquery',
  'backbone',
  'handlebars',
  'utils',
  //models
  'models/menu',
  //templates
  'text!templates/menu.html'
], function(Tomatoes, $, Backbone, Handlebars, Utils, Menu, MenuTemplate){

  var MenuView = Backbone.View.extend({

    initialize: function() {
      this.model = new Menu();
      this.listenTo(this.model, "change", this.render);
    },

    render: function() {

      // build the template
      var template = Handlebars.compile(MenuTemplate);
      var html = template(this.model.toJSON());
      this.$el.html(html);

      // listen for the route change event
      Tomatoes.events.on('router:change', this.setActive, this);

      return this;
    },

    setActive: function(option) {

        // if option is empty use 'new release'
        option = (option.length > 0) ? option : 'new';

        // find right menu element and set active class
        this.$el.find('li').removeClass('active');
        this.$el.find('li[data-link=' + option + ']').toggleClass('active');
    }

  });

  return MenuView;
});
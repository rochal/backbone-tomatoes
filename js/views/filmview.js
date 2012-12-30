define([
    'jquery',
    'backbone',
    'handlebars',
    'app',
    'utils',
    'models/film',

    //templates
    'text!templates/film.html'
], function($, Backbone, Handlebars, App, Utils, Film, FilmTemplate){

  var FilmView = Backbone.View.extend({

    tagName: 'li',

    className: 'span2',

    events: {
      'click .rateBtn': 'rateIt',
      'mouseover':      'mouseover',
      'mouseover':      'mouseout'
    },

    render: function() {

      var template = Handlebars.compile(FilmTemplate);
      var html = template(this.model.toJSON());

      this.$el.html(html);

      return this;  
    },

    initialize: function() {
      _.bindAll(this, "edit");
      Utils.events.bind("film:edit", this.edit);
      this.listenTo(this.model, "change", this.render);
    },

    mouseover: function() {
      this.$el.addClass("editing");
    },

    mouseout: function() {
      this.$el.removeClass("editing");
    },

    rateIt: function() {
      this.model.rateIt();
    },

    edit: function() {
      console.log("Film is being edited!", this.model.get("title"));
    }

  });

  return FilmView;
});
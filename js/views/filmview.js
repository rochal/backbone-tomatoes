define([
  'tomatoes',
  //libs
  'jquery',
  'bootstrap',
  'backbone',
  'handlebars',
  'utils',
  //models
  'models/film',
  //templates
  'text!templates/film.html',
  'text!templates/filmpopover.html'
], function(Tomatoes, $, Bootstrap, Backbone, Handlebars, Utils, Film, FilmTemplate, FilmPopoverTemplate){

  var FilmView = Backbone.View.extend({

    className: 'film-item',

    events: {
      'click .film-picture':      'toggleFavourite',
      'mouseover .film-picture':  'mouseover',
      'mouseout .film-picture':   'mouseout'
    },

    initialize: function() {
      this.listenTo(this.model, "change", this.render);
    },

    render: function() {

      var template = Handlebars.compile(FilmTemplate),
          html = template(this.model.toJSON());

      this.$el.html(html);

      this.$el.popover(this.getPopover());

      return this;
    },

    getPopover: function() {
      var self = this;
      var popover = {
        html: true,
        trigger: 'hover',
        title: self.model.get('title'),
        content: function() {
          // return popover html
          var popTemplate = Handlebars.compile(FilmPopoverTemplate)
          return popTemplate(self.model.toJSON());
        },
        placement: function(pop, el) {

          // check popover position and switch to left
          var popPosition = $(el).offset().left + $(el).width() + 240,
              docWidth = $(document).width();

          return (popPosition > docWidth) ? 'left' : 'right';
        }
      };
      return popover;
    },

    mouseover: function() {
      this.$el.addClass("over");
    },

    mouseout: function() {
      this.$el.removeClass("over");
    },

    toggleFavourite: function() {
      this.model.toggleFavourite();
    }
  });

  return FilmView;
});
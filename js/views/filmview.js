define([
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
], function($, Bootstrap, Backbone, Handlebars, Utils, Film, FilmTemplate, FilmPopoverTemplate){

  var FilmView = Backbone.View.extend({

    className: 'film-item',

    events: {
      'click .film-picture':      'toggleFavourite',
      'mouseover .film-picture':  'mouseover',
      'mouseout .film-picture':   'mouseout'
    },

    render: function() {

      var template = Handlebars.compile(FilmTemplate),
          html = template(this.model.toJSON()),
          self = this;

      this.$el.html(html);

      this.$el.popover({

        html: true,
        trigger: 'hover',
        title: this.model.get('title'),
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
      });

      return this;  
    },

    initialize: function() {
      _.bindAll(this, "edit");
      Utils.events.bind("film:edit", this.edit);
      this.listenTo(this.model, "change", this.render);
    },

    mouseover: function() {
      this.$el.addClass("over");
    },

    mouseout: function() {
      this.$el.removeClass("over");
    },

    toggleFavourite: function() {
      this.model.toggleFavourite();
    },

    edit: function() {
      console.log("Film is being edited!", this.model.get("title"));
    }

  });

  return FilmView;
});
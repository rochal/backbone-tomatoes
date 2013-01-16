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
      // any change to the model will cause re-render
      this.listenTo(this.model, "change", this.render);
    },

    render: function() {

      // build the template and update html
      var template = Handlebars.compile(FilmTemplate),
          html = template(this.model.toJSON());
      this.$el.html(html);

      // attach popover
      this.$el.popover(this.getPopover());

      // important return - we use this value
      // in mainview render method when we append FilmViews
      return this;
    },

    getPopover: function() {

      var self = this,
      popover = {
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

      // toggle favourite on the model
      this.model.toggleFavourite();

      // remove from UI if in favourites mode
      if (Backbone.history.fragment == 'fav' && this.model.get('isFavourite') == false)
      {
        this.$el.fadeOut('slow');
      }
    }
  });

  return FilmView;
});
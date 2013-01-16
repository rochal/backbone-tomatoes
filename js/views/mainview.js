define([
  'tomatoes',
  // libs
  'jquery',
  'backbone',
  'handlebars',
  // collections
  'collections/filmcollection',
  // models
  'models/main',
  'models/film',
  // views
  'views/filmview',
  'views/menuview'
], function(Tomatoes, $, Backbone, Handlebars, FilmCollection, Main, Film, FilmView, MenuView){

  var MainView = Backbone.View.extend({

    // attach the view to the element
    el: "#main",

    events: {
      'click #searchBtn':  'search',
      'keypress #search':  'searchOnEnter'
    },

    initialize: function() {

      //this.model = new Film();

      // attach the model and listen for changes
      this.model = new Main();
      this.listenTo(this.model, "change", this.render);

      // create menu view and render it
      this.menuView = new MenuView({ el: "#menu-holder", parent: this });
      this.menuView.render();
    },

    render: function() {

      var self = this,
          films = this.model.get('films');

      // clear the list
      self.$el.find('#film-list').html('');

      _.each(films, function(film, index) {
        // create a view for each film to display
        var view = new FilmView({model: film});
        self.$el.find('#film-list').append(view.render().$el);
      });

      return this;
    },

    parseFilmData: function(data) {

      // receive the film data and reset display collection
      var films = new FilmCollection();
      _.each(data.movies, function(value) {
        films.add(new Film(value));
      });
      Tomatoes.films = films;

      // update films to display
      this.model.set('films', films.getWithRating());

      this.render();
    },

    searchOnEnter: function(e) {
      // perform a search when enter is pressed
      if (e.keyCode != 13) return;
      this.search();
    },

    search: function() {

      var value = this.$el.find("#search").val(),
          self = this;

      // perform a lookup in tomatoes API
      Tomatoes.search(value, function(data) {
        // trigger an event when data comes back
        self.parseFilmData(data);
      });

      // create new search tag
      // TODO: Move this to use Handlebars
      var tags = this.$el.find('#recent-tags');

      if (tags.find('span[data-tag='+value+']').length == 0)
      {
        var span = $('<span></span>');
        span.toggleClass('label label-inverse')
            .text(value)
            .attr('data-tag', value);
        this.$el.find('#recent-tags').append(span).append(' ');
      }
    }
  });

  return MainView;
});

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
      this.menuView = new MenuView({ el: "#menu-holder" });
      this.menuView.render();
    },

    render: function() {

      var self = this,
          films = this.model.get('displayfilms');

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

      // receive the film data
      var films = new FilmCollection();
      _.each(data.movies, function(value) {
        films.add(new Film(value));
      });
      Tomatoes.films = films;

      // update films to display
      this.model.set('displayfilms', films.getWithRating());

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
    }

  });

  return MainView;
});

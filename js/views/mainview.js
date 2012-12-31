define([
  //libs
  'jquery',
  'backbone',
  'handlebars',
  'utils',
  'tomatoes',
  //collections
  'collections/filmcollection',
  //models
  'models/main',
  'models/film',
  //views
  'views/filmview',
  'views/menuview'    
], function($, Backbone, Handlebars, Utils, Tomatoes, FilmCollection, Main, Film, FilmView, MenuView){

  var MainView = Backbone.View.extend({

    el: "#main",

    events: {
      'click #searchBtn':  'search',
      'keypress #search':  'searchOnEnter'
    },

    initialize: function() {

      this.model = new Main();
      this.listenTo(this.model, "change", this.render);

      this.menuView = new MenuView({ el: "#menu-holder" });
      this.menuView.render();

      this.on("film:updateall", this.parseFilmData, this);      
    },

    render: function() {

      var self = this,
          films = this.model.get('films');

      self.$el.find('#film-list').html('');
      _.each(films, function(film, index) {
        var view = new FilmView({model: film});
        self.$el.find('#film-list').append(view.render().$el);
      });

      return this;  
    },

    parseFilmData: function(data) {

      var films = new FilmCollection();
      _.each(data.movies, function(value) {
        films.add(new Film(value));
      });

      this.model.set('filmcollection', films);
      this.model.set('films', films.getWithRating());
      this.render();
    },

    searchOnEnter: function(e) {
      if (e.keyCode != 13) return;
      this.search();
    },

    search: function() {

      var value = this.$el.find("#search").val(),
          self = this;

      var tomatoe = new Tomatoes();

      tomatoe.search(value, function(data) {
        self.trigger('film:updateall', data);
      });
    }    

  });

  return MainView;
});

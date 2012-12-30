define([
  //libs
  'jquery',
  'backbone',
  'handlebars',
  'utils',
  //models
  'models/main',
  'models/film',
  //views
  'views/filmview',
  'views/menuview'    
], function($, Backbone, Handlebars, Utils, Main, Film, FilmView, MenuView){

  var MainView = Backbone.View.extend({

    el: "#main",

    initialize: function() {

      this.model = new Main();
      this.listenTo(this.model, "change", this.render);

      this.menuView = new MenuView({ el: "#menu-holder" });
      this.menuView.on("film:updateall", this.parseFilmData, this);
      this.menuView.render();
    },

    render: function() {

      var self = this,
          films = this.model.get('films').getGoodByYear();

      self.$el.find('#film-list').html('');
      _.each(films, function(film, index) {
        var view = new FilmView({model: film});
        self.$el.find('#film-list').append(view.render().$el);
      });

      return this;  
    },

    parseFilmData: function(data) {

      var films = this.model.get('films');
      _.each(data.movies, function(value) {
        films.add(new Film(value));
      });

      this.model.set('films', films);
      this.render();
    }

  });

  return MainView;
});

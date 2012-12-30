define([
		'jquery',
		'backbone',
		'handlebars',
		'utils',
		'models/library',
		'views/filmview',
		'views/menuview',
		'models/film'
], function($, Backbone, Handlebars, Utils, Library, FilmView, MenuView, Film){

	var LibraryView = Backbone.View.extend({

		el: "#library",

		initialize: function() {

			this.model = new Library();
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

	return LibraryView;
});

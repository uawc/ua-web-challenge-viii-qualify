/*jshint esnext:true*/
define(['jquery', 'underscore', 'backbone', 'views/slider.view', 'views/filter.view', 'views/settings.view', 'models/slider.model', 'collections/slide.collection'],
	($, _, Backbone, SliderView, FilterView, SettingsView, sliderModel, slideCollection)=>{
		'use strict';

		// Main App View
		return Backbone.View.extend({

			// Define View element
			el: '#app-content',

			// Initialize app.view
			initialize() {
				this.filterView = new FilterView();
				this.settingsView = new SettingsView();
				this.render();
			},

			render() {
				this.sliderView = new SliderView({model: sliderModel, collection: slideCollection});

				this.$el.find('.filter-wrapper').append(this.filterView.el);
				this.$el.find('.filter-wrapper').prepend(this.settingsView.el);
				this.$el.find('.slider-wrapper').append(this.sliderView.el);
			}
		});
	});
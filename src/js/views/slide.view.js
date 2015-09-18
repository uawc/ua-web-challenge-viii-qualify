/*jshint esnext:true*/
define(['jquery', 'underscore', 'backbone', 'templates'],
	($, _, Backbone, templates)=>{
		'use strict';

		return Backbone.View.extend({

			//view element tagName
			tagName: 'li',

			//view template
			template: templates.slide,

			//view events
			events: {
				'click .favorite': '_onFavoriteClick'
			},

			// Initialize slide.view
			initialize: function () {
				this.listenTo(this.model, 'change:isHidden', this.render);
				this.listenTo(this.model, 'change:category', this.render);

				this.render();
			},

			render: function () {
				this.$el.html(this.template(this.model.toJSON()));
				this._createImage();

				return this;
			},

			/**
			 * Appending image into the DOM in case it's completely loaded
			 * @private
			 * */
			_imageOnLoad() {
				this.$el.append(this._img);
			},

			/**
			 * Creating image DOM element
			 * @private
			 * */
			_createImage() {
				this._img = new Image();
				this._img.onload = this._imageOnLoad.bind(this);
				this._img.src = this.model.get('url');
			},

			/**
			 * On favorites icon click handler
			 * @private
			 * */
			_onFavoriteClick() {
				this.model.toggleFavorite();
				this.render();
			}
		});
	});
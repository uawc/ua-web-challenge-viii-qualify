/*jshint esnext:true*/
define(['jquery', 'underscore', 'backbone', 'templates', 'views/slide.view'],
	($, _, Backbone, templates, SlideView)=>{
		'use strict';

		return Backbone.View.extend({

			//view element tagName
			tagName: 'div',

			//view element className
			className: 'slider',

			//view template
			template: templates.slider,

			//view events
			events: {
				'click .arrow-right': '_onNextClick',
				'click .arrow-left': '_onPrevClick'
			},

			// Initialize slider.view
			initialize() {
				this.collection.fetchCategory();
				this.render();

				this.listenTo(this.model, 'change', this._onChangeSize);
				this.listenTo(this.collection, 'filter:changed', this.render);
				$(document).on('keydown', this._onKeyDown.bind(this));
			},

			render() {
				this.$el.html(this.template());
				this._renderSlide();
				this._changeSliderSize();

				return this;
			},

			/**
			 * Rendering current slide model within collection
			 * @private
			 * */
			_renderSlide() {
				if (this.slideView) {
					this.slideView.remove();
				}

				this.slideView = new SlideView({model: this.collection.getCurrentModel()});
				this.$el.find('ul.slides').append(this.slideView.el);
			},

			/**
			 * On next arrow or right key clicking handler
			 * @private
			 * */
			_onNextClick() {
				this.collection.nextSlide();
				this.render();
			},

			/**
			 * On previous arrow or left key clicking handler
			 * @private
			 * */
			_onPrevClick() {
				this.collection.prevSlide();
				this.render();
			},

			/**
			 * On keyDown handler
			 * @private
			 * */
			_onKeyDown(e) {
				switch (e.keyCode) {
					case 39:
						this._onNextClick();
						break;
					case 37:
						this._onPrevClick();
						break;
				}
			},

			/**
			 * Rendering view if slider size is changed
			 * @private
			 * */
			_onChangeSize() {
				this.collection.changeSize(this.model.get('width'), this.model.get('height'));
				this._saveSize(this.model.get('width'), this.model.get('height'));
				this.render();
			},

			/**
			 * Changing slider wrapper size style
			 * @private
			 * */
			_changeSliderSize() {
				let width = this.model.get('width'),
					height = this.model.get('height');

				this.$el.css({width, height});
			},

			/**
			 * Saving new style to LocalStorage
			 * @private
			 * */
			_saveSize(width, height) {
				localStorage.setItem('width', width);
				localStorage.setItem('height', height);
			},

			/**
			 * Render model within collection
			 * @private
			 * @param {model}
			 * */
			_renderChild(child) {
				if (child.get('isHidden')) {
					return;
				}
				let slideView = new SlideView({model: child});
				this.$el.find('ul').append(slideView.$el);
			}
		});
	});
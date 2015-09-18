/*jshint esnext:true*/
define(['underscore', 'backbone', 'models/slide.model'],
	(_, Backbone, SlideModel)=>{
		'use strict';

		let SlideCollection = Backbone.Collection.extend({
			// Reference to this collection's model.
			model: SlideModel,

			/**
			 * Resetting and filling collection with models containing favorites
			 * @public
			 * */
			fetchFavorites() {
				this.reset();
				this.add(JSON.parse(localStorage.getItem('favorites') || '[]'));
				this.at(0).set('isHidden', false);
			},

			/**
			 * Resetting and filling collection with models containing specific category
			 * @public
			 * @param category - category for slide models
			 * */
			fetchCategory(category) {
				this.reset();

				for (let i = 1; i <= 10; i++) {
					this.add({
						number: i,
						category: category ? category : 'sports',
						isHidden: i !== 1
					});
				}
			},

			/**
			 * Setting visibility of next slide
			 * @public
			 * */
			nextSlide() {
				this._changeSlide(this.getNextModel());
			},

			/**
			 * Setting visibility of previous slide
			 * @public
			 * */
			prevSlide() {
				this._changeSlide(this.getPrevModel());
			},

			/**
			 * Getting current model from collection
			 * @public
			 * @return model
			 * */
			getCurrentModel() {
				return this.findWhere({isHidden: false});
			},

			/**
			 * Getting next model from collection
			 * @public
			 * @return model
			 * */
			getNextModel() {
				return this.at(this._getIndex(true));
			},

			/**
			 * Getting previous model from collection
			 * @public
			 * @return model
			 * */
			getPrevModel() {
				return this.at(this._getIndex(false));
			},

			/**
			 * Changing category attribute for all models
			 * @public
			 * */
			changeCategory(category) {
				this.each(function (model) {
					model.set('category', category);
				});
			},

			/**
			 * Changing size attribute for all models
			 * @public
			 * */
			changeSize(width, height) {
				this.each(function (model) {
					model.set({width, height});
				});
			},

			/**
			 * Fetching collection per filter
			 * @public
			 * @param data.filter
			 * @param data.category
			 * */
			changeFilter(data) {
				switch (data.filter) {
					case 'favorites':
						this.fetchFavorites();
						break;
					case 'mock':
						this.fetchCategory(data.category);
						break;
				}

				this.trigger('filter:changed');
			},

			/**
			 * Getting position index of next/previous model in collection
			 * @private
			 * @param isNextSlide - if true - next model; if false - previous
			 * */
			_getIndex(isNextSlide) {
				let currentIndex = this.indexOf(this.getCurrentModel());

				return isNextSlide ? currentIndex === this.length - 1 ? 0 : ++currentIndex : currentIndex === 0 ? this.length - 1 : --currentIndex;
			},

			/**
			 * Changing isHidden attribute for next/prev model
			 * @private
			 * @param targetModel - model
			 * */
			_changeSlide(targetModel) {
				this.getCurrentModel().toggleVisibility();
				targetModel.toggleVisibility();
			}
		});

		return new SlideCollection();
	});
/*jshint esnext:true*/
define(['underscore', 'backbone'],
	(_, Backbone)=>{
		'use strict';

		return Backbone.Model.extend({
			// Default data of this Model
			defaults: {
				url: '#',
				number: '',
				isHidden: true,
				isFavorite: false,
				category: 'sports',
				host: 'http://lorempixel.com/'
			},

			// Initialize slide.model
			initialize() {
				this._setSize();
				this._updateModel();

				this.on('change:category change:width change:height', this._updateModel.bind(this));
				this.on('change:isFavorite', this._saveFavoriteValueToLS.bind(this));
			},

			/**
			 * Toggling model isHidden attribute
			 * @public
			 * */
			toggleVisibility() {
				this.set('isHidden', !this.get('isHidden'));
				return this;
			},

			/**
			 * Toggling model isFavorite attribute
			 * @public
			 * */
			toggleFavorite() {
				this.set('isFavorite', !this.get('isFavorite'));
				return this;
			},

			/**
			 * Getting favorites array from LocalStorage
			 * @private
			 * @return {object}
			 * */
			_getFavoriteValueFromLS() {
				return {
					favorites: JSON.parse(localStorage.getItem('favorites') || '[]'),
					model: {
						number: this.get('number'),
						category: this.get('category')
					}
				};
			},

			/**
			 * Saving favorites array to LocalStorage
			 * @private
			 * @return {object}
			 * */
			_saveFavoriteValueToLS() {
				let data = this._getFavoriteValueFromLS();

				if (this.get('isFavorite')) {
					data.favorites.push(data.model);
				} else {
					data.favorites = _.reject(data.favorites, (el) => _.isEqual(el, data.model));
				}

				localStorage.setItem('favorites', JSON.stringify(data.favorites));
				this.collection.trigger('favorites:changed');
			},

			/**
			 * Setting saved slider slide to model
			 * @private
			 * */
			_setSize() {
				this.set({
					width: localStorage.getItem('width') || 600,
					height: localStorage.getItem('height') || 600
				}, {silent: true});
			},

			/**
			 * Updating model's isFavorite and url attribute
			 * @private
			 * */
			_updateModel() {
				this.set('isFavorite', this._isFavorite());
				this.set('url', `${this.get('host')}${this.get('width')}/${this.get('height')}/${this.get('category')}/${this.get('number')}`);
			},

			/**
			 * Checking if current model is favorite
			 * @private
			 * @return {boolean}
			 * */
			_isFavorite() {
				let data = this._getFavoriteValueFromLS();
				return !!_.find(data.favorites, (el) => _.isEqual(el, data.model));
			}
		});
	});
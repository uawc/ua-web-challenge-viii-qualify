/*jshint esnext:true*/
define(['jquery', 'underscore', 'backbone', 'templates', 'collections/slide.collection'],
	($, _, Backbone, templates, slideCollection)=>{
		'use strict';

		return Backbone.View.extend({

			//view element className
			className: 'container',

			//view template
			template: templates.filter,

			//view events
			events: {
				'change select.category': '_onCategoryChange',
				'change select': '_onFilterSlidesChange'
			},

			//Initializing of filter.view
			initialize: function () {
				this.render();

				this.listenTo(slideCollection, 'favorites:changed', this._toggleFilter);
			},

			render: function () {
				this.$el.html(this.template());
				this._toggleFilter();

				return this;
			},

			/**
			 * On category change handler
			 * @private
			 * */
			_onCategoryChange(e) {
				slideCollection.changeCategory($(e.currentTarget).val());
			},

			/**
			 * On filter change handler
			 * @private
			 * */
			_onFilterSlidesChange(e) {
				slideCollection.changeFilter({
					filter: $(e.currentTarget).val(),
					category: this.$el.find('.category').val()
				});
				this._toggleFilter();
				this._toggleCategory($(e.currentTarget).val());
			},

			/**
			 * Checking favorites array in LocalStorage
			 * @private
			 * @return {boolean}
			 * */
			_checkFavorites() {
				return _.isEmpty(JSON.parse(localStorage.getItem('favorites') || '[]'));
			},

			/**
			 * Disable/enable category field depends on filter field value
			 * @private
			 * @param filterValue
			 * */
			_toggleCategory(filterValue) {
				if (filterValue === 'favorites') {
					this.$el.find('select.category').attr('disabled', 'disabled');
				} else {
					this.$el.find('select.category').removeAttr('disabled');
				}
			},

			/**
			 * Show/hide filter field depends on favorites existence
			 * @private
			 * */
			_toggleFilter() {
				let $filter = this.$el.find('.filter-slides'),
					$filterWrap = this.$el.find('.filter-slides-fn');

				if (($filter.val() !== 'favorites') && this._checkFavorites()) {
					$filterWrap.hide();
				} else {
					$filterWrap.show();
				}
			}
		});
	});
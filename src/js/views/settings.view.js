/*jshint esnext:true*/
define(['jquery', 'underscore', 'backbone', 'models/slider.model', 'templates'],
	($, _, Backbone, sliderModel, templates)=>{
		'use strict';

		return Backbone.View.extend({

			//view element className
			className: 'settings',

			//view template
			template: templates.settings,

			//view events
			events: {
				'input .range': '_onRangeChange',
				'click .settings': '_onSettingsClick',
				'click .save': '_onSaveClick'
			},

			// Initialize settings.view
			initialize: function () {
				this.render();
			},

			render: function () {
				this.$el.html(this.template({
					width: localStorage.getItem('width') || 600,
					height: localStorage.getItem('height') || 600
				}));
				return this;
			},

			/**
			 * On range change handler
			 * @private
			 * */
			_onRangeChange(e) {
				$(e.currentTarget).closest('.row').find('.range-input').val($(e.currentTarget).val());
			},

			/**
			 * On settings button click handler
			 * @private
			 * */
			_onSettingsClick() {
				this.render();
			},

			/**
			 * On save button click handler
			 * @private
			 * */
			_onSaveClick() {
				let width = this.$el.find('[data-type="width"]').val(),
					height = this.$el.find('[data-type="height"]').val();

				sliderModel.set({width, height});
			}
		});
	});
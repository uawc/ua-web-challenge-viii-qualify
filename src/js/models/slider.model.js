/*jshint esnext:true*/
define(['underscore', 'backbone'],
	(_, Backbone)=>{
		'use strict';

		let SliderModel = Backbone.Model.extend({
			// Initialize slide.model
			initialize() {
				this._setSize();
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
			}
		});

		return new SliderModel();
	});
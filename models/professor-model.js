const mongoose = require('mongoose');
//schema
const Prof = mongoose.model('Prof', {
	name: {
		type: String,
		required: true
	},
	photo: {
		type: String,
		required: true
	},
	uni: {
		type: String,
		required: true
	},
	school: {
		type: String,
		required: true
	},
	dept: {
		type: String,
		required: true
	},
	percentage_take_again: {
		type: String
	},
	overall_difficulty: {
		type: String
	},
	overall_rating: {
		type: String
	},
	tags: {
		type: String
	},
	courses: {
		type: String
	}
});

module.exports = Prof;

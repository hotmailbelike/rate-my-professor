const mongoose = require('mongoose');
//schema
const Comment = mongoose.model('Comment', {
	date: {
		type: String
	},
	course: {
		type: String,
		default: 'N/A'
	},
	prof_id: {
		type: String
	},
	rating: {
		type: String
	},
	level_of_difficulty: {
		type: String
	},
	take_again: {
		type: String,
		default: 'N/A'
	},
	forCredit: {
		type: String,
		default: 'N/A'
	},
	textbook_used: {
		type: String,
		default: 'N/A'
	},
	attendance: {
		type: String,
		default: 'N/A'
	},
	grade: {
		type: String,
		default: 'N/A'
	},
	tags: {
		type: [String],
		default: 'No tags to add'
	},
	comments: {
		type: String,
		default: 'No Comments'
	},
	emote: {
		type: String
	},
	rating_in_words: {
		type: String
	}
});

module.exports = Comment;

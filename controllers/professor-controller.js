const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Prof = mongoose.model('Prof');
const Comment = mongoose.model('Comment');

router.post('/input_prof_info', (req, res) => {
	var prof = Prof(req.body).save((e, data) => {
		if (e) {
			throw e;
		}
		res.json(data);
	});
});

router.get('/home/search_prof', (req, res) => {
	// console.log(req.query);

	var name = req.query.name;
	var uni = req.query.school;
	var prof = Prof.find(
		{
			name: {
				$regex: name,
				$options: 'i'
			},
			uni: {
				$regex: uni,
				$options: 'i'
			}
		},
		(e, data) => {
			if (e) {
				throw e;
			}
			if (data.length === 0) {
				res.render('no_result', {
					searchKey: name
				});
			} else {
				res.render('prof_search_result', {
					info: data
				});
			}
		}
	);
});

router.get('/home/search_school', (req, res) => {
	// console.log(req.query);

	var uni = req.query.school;
	var prof = Prof.find(
		{
			uni: {
				$regex: uni,
				$options: 'i'
			}
		},
		(e, data) => {
			if (e) {
				throw e;
			}
			if (data.length === 0) {
				res.render('no_result', {
					searchKey: uni
				});
			} else {
				res.render('prof_search_result', {
					info: data
				});
			}
		}
	);
});

router.get('/home/rate_prof', (req, res) => {
	// console.log(req.query);

	var name = req.query.name;

	var prof = Prof.find(
		{
			name: {
				$regex: name,
				$options: 'i'
			}
		},
		(e, data) => {
			if (e) {
				throw e;
			}
			if (data.length === 0) {
				res.render('no_result', {
					searchKey: name
				});
			} else {
				res.render('prof_search_result', {
					info: data
				});
			}
		}
	);
});

router.post('/home/search_school/:school', (req, res) => {
	var uni = req.params.school;
	// console.log(uni);
	var prof = Prof.find(
		{
			uni: {
				$regex: uni,
				$options: 'i'
			}
		},
		(e, data) => {
			if (e) {
				throw e;
			}
			res.json(data);
		}
	);
});

router.post('/home/search_prof/:name', (req, res) => {
	var name = req.params.name;
	// console.log(name);
	var prof = Prof.find(
		{
			name: {
				$regex: name,
				$options: 'i'
			}
		},
		(e, data) => {
			if (e) {
				throw e;
			}
			// console.log(data);
			res.json(data);
		}
	);
});

router.post('/home/search_prof_with_school/:searchTerm', (req, res) => {
	var searchTerm = JSON.parse(req.params.searchTerm);
	var name = searchTerm.name;
	var uni = searchTerm.school;
	var prof = Prof.find(
		{
			name: {
				$regex: name,
				$options: 'i'
			},
			uni: {
				$regex: uni,
				$options: 'i'
			}
		},
		(e, data) => {
			if (e) {
				throw e;
			}
			res.json(data);
		}
	);
});

router.get('/prof_info', (req, res) => {
	// var param = JSON.parse(req.params.searchTerm);
	// console.log(req.params);
	var id = req.query.id;
	var url = req.query.url;
	var msg = 'Want to say more? Click here to add another comment!';
	if (url.includes('/home')) {
		msg = 'Not the Professor you were looking for? Click here to go back to your search result!';
	}
	// console.log(id, url);
	// var url = param.url;
	var comment = Comment.find({ prof_id: id }, (e, comments) => {
		if (e) {
			throw e;
		}

		// console.log(comments);
		var overallQuality = 0,
			takeAgain = 0,
			levelOfDifficulty = 0,
			tags = [];

		comments.forEach((i) => {
			overallQuality += parseFloat(i.rating);
			if (i.take_again === 'Yes') {
				takeAgain++;
			}
			levelOfDifficulty += parseFloat(i.level_of_difficulty);
			i.tags.forEach((tag) => {
				if (tag === 'No tags to add') {
					//Do nothing
				} else if (!tags.includes(tag)) {
					tags.push(tag);
				}
			});
		});

		overallQuality = overallQuality / comments.length;
		takeAgain = (takeAgain / comments.length) * 100;
		levelOfDifficulty = levelOfDifficulty / comments.length;

		if (!overallQuality) {
			overallQuality = 'N/A';
		}
		if (!takeAgain) {
			takeAgain = 1;
		}
		if (!levelOfDifficulty) {
			levelOfDifficulty = 1;
		}
		if (tags.length == 0 || !tags) {
			tags = ['No tags so far'];
		}

		// console.log(comments.length);

		// console.log(overallQuality, takeAgain, levelOfDifficulty, tags);

		var prof = Prof.find({ _id: id }, (e, data) => {
			if (e) {
				throw e;
			}
			res.render('prof_info', {
				id: data[0]._id,
				name: data[0].name,
				photo: data[0].photo,
				dept: data[0].dept,
				uni: data[0].uni,
				url: url,
				msg: msg,
				comments: comments,
				overallQuality: overallQuality,
				takeAgain: takeAgain,
				levelOfDifficulty: levelOfDifficulty,
				tags: tags
			});
			// console.log(data);
		});
	});
});

module.exports = router;

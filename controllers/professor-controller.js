const express = require('express');
const router = new express.Router();
const mongoose = require('mongoose');
const Prof = mongoose.model('Prof');

router.post('/input_prof_info', (req, res) => {
	var prof = Prof(req.body).save((e, data) => {
		if (e) {
			throw e;
		}
		res.json(data);
	});
});

router.get('/home/search_prof', (req, res) => {
	console.log(req.query);

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
			res.render('prof_search_result', {
				info: data
			});
		}
	);
});

router.get('/home/search_school', (req, res) => {
	console.log(req.query);

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
			res.render('prof_search_result', {
				info: data
			});
		}
	);
});

router.get('/home/rate_prof', (req, res) => {
	console.log(req.query);

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
			res.render('prof_search_result', {
				info: data
			});
		}
	);
});

module.exports = router;

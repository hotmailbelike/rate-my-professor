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

module.exports = router;

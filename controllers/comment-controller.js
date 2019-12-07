const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Comment = mongoose.model('Comment');
const Prof = mongoose.model('Prof');

router.get('/review', (req, res) => {
	res.render('reviewPage');
});

router.get('/review/:id', (req, res) => {
	var id = req.params.id;
	Prof.find({ _id: id }, (e, data) => {
		if (e) {
			throw e;
		}
		res.render('reviewPage', {
			id: id,
			name: data[0].name
		});
	});
});

router.post('/insert_comment', (req, res) => {
	Comment(req.body).save((e, data) => {
		if (e) {
			throw e;
		}
		res.json(data);
	});
});

module.exports = router;

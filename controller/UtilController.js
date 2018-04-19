'use strict';
const express = require('express');
const { healthCheck } = require('../Services/healthCheck');
const fs = require('fs');

var router = express.Router();
router.get('/healthCheck', function (req, res) {
	// const task = "health checking task";
	// console.time(task);
	healthCheck().then(result => {
		res.render('Util/healthCheck', { result: result });
	})
		.catch(err => console.log(err));
});

router.get('/countdown', function (req, res) {
	let issues = [
		{ ts: `${new Date().toJSON().split("T")[0]} 18:00:00`, issue: "收工" },
		{ ts: `2018-06-13 18:00:00`, issue: "丸爺解放日" },
	];
	res.status(200).render('Util/countdown', { issues: issues });
});

router.get('/hostList', function (req, res) {
	fs.readFile('/etc/hosts', 'utf8', function (err, data) {
		if (err) {
			console.log(err);
		}
		res.render('Util/hostlist', { data: data });
	});

});

module.exports = {
	UtilRouter: router
};


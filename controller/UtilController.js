'use strict';
const express = require('express');
const { healthCheck } = require('../Services/healthCheck');
const fs = require('fs');
const { _render, getmodel } = require('../lib/helper');

var router = express.Router();

router.get('/healthCheck', function (req, res) {
	let model = getmodel();
	healthCheck().then(result => {
		model.main.data = result;
		_render(res, 'Util/healthCheck', model);
	}).catch(err => console.log(err));
});

router.get('/countdown', function (req, res) {
	let issues = [
		{ ts: `${new Date().toJSON().split("T")[0]} 18:00:00`, issue: "收工" },
		{ ts: `2018-06-13 18:00:00`, issue: "丸爺解放日" },
	];
	let model = getmodel();
	model.main.data = issues;
	_render(res, 'Util/countdown', model);
});

router.get('/hostList', function (req, res) {
	fs.readFile('/etc/hosts', 'utf8', function (err, data) {
		if (err) {
			console.log(err);
		}
		let model = getmodel();
		model.main.data = data;
		_render(res, 'Util/hostlist', model);
	});
});

module.exports = {
	UtilRouter: router
};


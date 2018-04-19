'use strict';
const express = require('express');
const fs = require('fs');
const { _render, getmodel, makeAjax } = require('../lib/helper');

var router = express.Router();

router.get('/healthCheck', function (req, res) {
	const { healthCheck } = require('../Services/healthCheck');
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

router.get('/youtubeDownload', function (req, res) {
	let model = getmodel();
	model.head.script = ['util/youtubeDownload.js'];
	_render(res, 'Util/youtubeDownload', model);
});

router.post('/youtubeDownload', function (req, res) {
	const { downloadYoutube } = require('../Services/youtubeDownload');
	let result = downloadYoutube();
	makeAjax(res, result);
});

module.exports = {
	UtilRouter: router
};


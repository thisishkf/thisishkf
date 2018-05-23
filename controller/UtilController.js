'use strict'; 
const express = require('express');
const fs = require('fs');
const youtubeDownloader = require('easyyoutubedownload');

const { _render, getmodel, makeAjax } = require(__dirname + '/../lib/Helper');
const Logger = require(__dirname + '/../lib/Logger');

var _router = express.Router();

_router.get('/healthCheck', function (req, res) {
	const { healthCheck } = require('../Services/healthCheck');
	let model = getmodel('www');
	healthCheck().then(result => {
		model.main.data = result;
		_render(res, 'Util/healthCheck', model);
	}).catch(err => {
		Logger.error(err);
	});
});

_router.get('/countdown', function (req, res) {
	const issues = [
		{ ts: `${new Date().toJSON().split("T")[0]} 18:00:00`, issue: "收工" },
		{ ts: `2018-06-10 18:00:00`, issue: "Yeun Last Day" },
		{ ts: `2018-06-01 17:30:00`, issue: "Nathan Last Day" },
		{ ts: `2018-07-02 18:00:00`, issue: "Sam Last Day" },
	];
	let model = getmodel('www');
	model.main.data = issues;
	model.head.script = ['util/countdown.js'];
	_render(res, 'Util/countdown', model);
});

_router.get('/hostList', function (req, res) {
	fs.readFile('/etc/hosts', 'utf8', function (err, data) {
		if (err) {
			Logger.error(err);
		}
		let model = getmodel('www');
		model.main.data = data;
		_render(res, 'Util/hostlist', model);
	});
});

_router.get('/youtubeDownload', function (req, res) {
	let model = getmodel('www',['util/youtubeDownload.js']);
	_render(res, 'Util/youtubeDownload', model);
});

_router.post('/youtubeDownload', function (req, res) {
	let data = req.body;
	youtubeDownloader.setDownloadPath("mp3", __dirname + "/../public/static/files/mp3");
	youtubeDownloader.setDownloadPath("mp4", __dirname + "/../public/static/files/mp4");
	youtubeDownloader.download(data , function(result){
		makeAjax(res, result);
	});
	
});

module.exports = _router;


'use strict';
const express = require('express');
const fs = require('fs');
const youtubeDownloader = require('easyyoutubedownload');

const { _render, getmodel, makeAjax } = require(__dirname + '/../lib/Helper');
const Logger = require(__dirname + '/../lib/Logger');
const mysqldb = require(__dirname + '/../lib/MySQLService');
const mongodb = require(__dirname + '/../lib/MongoService');

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
	const SQL_S_COUNTDOWN = "SELECT issue, `timestamp` FROM countdown WHERE status = :status AND timestamp > CURRENT_TIMESTAMP";
	mysqldb.select(SQL_S_COUNTDOWN, { status: 1 }, function (results) {
		results.push({
			issue: '收工',
			timestamp: `${new Date().toJSON().split("T")[0]} 18:00:00`
		});
		let model = getmodel('www');
		model.main.data = results;
		model.head.script = ['util/countdown.js'];
		_render(res, 'Util/countdown', model);
	});
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

_router.get('/honorship/:code', function (req, res) {
	const SQL_S_HONORSHIP_BY_PROGRAM = "SELECT `course_code`, `title`, `credit`, `level`, `group` FROM honorship WHERE status = :status AND program_code = :code";
	mysqldb.select(SQL_S_HONORSHIP_BY_PROGRAM, { status: 1, code: req.params.code }, function (results) {
		let model = getmodel('www', ['util/honorship.js']);
		model.main.data = results;
		_render(res, 'Util/honorship', model);
	});
});

_router.get('/youtubeDownload', function (req, res) {
	let model = getmodel('www', ['util/youtubeDownload.js']);
	_render(res, 'Util/youtubeDownload', model);
});

_router.post('/youtubeDownload', function (req, res) {
	let data = req.body;
	youtubeDownloader.setDownloadPath("mp3", __dirname + "/../public/static/files/mp3");
	youtubeDownloader.setDownloadPath("mp4", __dirname + "/../public/static/files/mp4");
	youtubeDownloader.download(data, function (result) {
		makeAjax(res, result);
	});
});

module.exports = _router;


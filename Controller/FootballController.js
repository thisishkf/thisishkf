'use strict';
const express = require('express');

const { _render, getmodel, makeAjax } = require(__dirname + '/../lib/Helper');
const mongodb = require(__dirname + '/../lib/MongoService');
const { getHKJCMatchList, getHKJCHDA, getHKJCCHL, getHKJCHIL, getHKJCCRS, getHKJCFCS, getHKJCTTGO } = require(__dirname + '/../Services/FootballService');
var _router = express.Router();

_router.get('/index', async function (req, res) {
	let model = getmodel('www', []);
	model.main.data = await getHKJCMatchList();
	_render(res, 'Football/index', model);
});

_router.get('/hda/:id', async function (req, res) {
	let model = getmodel('www', []);
	model.main.data = await getHKJCHDA(req.params.id);
	_render(res, 'Football/hda', model);
});

_router.get('/c/:id', async function (req, res) {
	let model = getmodel('www', []);
	model.main.data = await getHKJCCHL(req.params.id);
	_render(res, 'Football/corner', model);
});

_router.get('/s/:id', async function (req, res) {
	let model = getmodel('www', []);
	model.main.data = await getHKJCHIL(req.params.id);
	_render(res, 'Football/score', model);
});

_router.get('/crs/:id', async function (req, res) {
	let model = getmodel('www', []);
	model.main.data = await getHKJCCRS(req.params.id);
	_render(res, 'Football/crs', model);
});

_router.get('/fcs/:id', async function (req, res) {
	let model = getmodel('www', []);
	model.main.data = await getHKJCFCS(req.params.id);
	_render(res, 'Football/half_crs', model);
});


_router.get('/ttgo/:id', async function (req, res) {
	let model = getmodel('www', []);
	model.main.data = await getHKJCTTGO(req.params.id);
	_render(res, 'Football/ttgo', model);
});

_router.get('/analyse/:id', function (req, res) {
	let _data = [], data = {};;
	mongodb.get().collection('hkjc_raw')
		.aggregate([
			{ "$match": { "match.id": req.params.id } },
			{ "$sort": { "_id": -1 } },
			{ "$limit": 1 }
		]).toArray(function (err, result) {
			let model = getmodel('www', []);
			model.main.data = result[0];
			_render(res, 'Football/index', model);
		});
});

module.exports = _router;


// $('#main-tbody')
// 	.find('tr')
// 	.each((i, ele) => {
// 		console.log($(ele).attr('data-fid'));
// 	});
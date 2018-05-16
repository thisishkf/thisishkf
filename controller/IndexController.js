'use strict';

const express = require('express');

const { _render, getmodel, makeAjax } = require(__dirname + '/../lib/Helper');
const Logger = require(__dirname + '/../lib/Logger');

var _router = express.Router();

_router.get('/', function(req, res){
	res.status(200).end("/");
});

_router.get('/login', function(req, res){
	res.status(200).end("/login");
});

_router.get('/logout', function(req, res){
	res.status(200).end("/logout");
});
	
module.exports = _router;

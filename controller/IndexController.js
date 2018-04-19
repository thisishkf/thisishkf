'use strict';
const express = require('express');

var router = express.Router();
router.get('/', function(req, res){
	res.status(200).end("/");
});
router.get('/login', function(req, res){
	res.status(200).end("/login");
});

router.get('/logout', function(req, res){
	res.status(200).end("/logout");
});
	
module.exports = {
    IndexRouter : router
};


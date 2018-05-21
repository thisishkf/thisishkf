'use strict';
const express = require('express');

const { _render, getmodel, makeAjax } = require(__dirname + '/../lib/Helper');
const Logger = require(__dirname + '/../lib/Logger');

var _router = express.Router();


_router.get('/no2g', function (req, res) {
    let model = getmodel('www', ['game/no2g.js']);
    _render(res, 'game/no2g.ejs', model);
});

module.exports = _router;


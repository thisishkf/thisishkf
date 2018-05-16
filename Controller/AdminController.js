'use strict';

const express = require('express');

const { _render, getmodel, makeAjax } = require(__dirname + '/../lib/Helper');
const Logger = require(__dirname + '/../lib/Logger');

var _router = express.Router();


_router.get('/', function (req, res) {
    let model = getmodel('admin');
    _render(res, 'admin/index.ejs', model);
});

module.exports = _router;

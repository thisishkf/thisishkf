'use strict';
const express = require('express');
const fs = require('fs');
const { _render, getmodel, makeAjax } = require('../lib/helper');

var _router = express.Router();


_router.get('/', function (req, res) {
    let model = getmodel('admin');
    _render(res, 'admin/index.ejs', model);
});

module.exports = _router;

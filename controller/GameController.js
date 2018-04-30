'use strict';
const express = require('express');
const fs = require('fs');
const { _render, getmodel, makeAjax } = require('../lib/helper');

var router = express.Router();


router.get('/no2g', function (req, res) {
    let model = getmodel();
    model.head.script = ['game/no2g.js'];
    _render(res, 'game/no2g.ejs', model);
});

module.exports = {
    GameRouter: router
};


'use strict';
const express = require('express');
const fs = require('fs');
const { _render, getmodel, makeAjax } = require('../lib/helper');

var router = express.Router();

router.get('/portfolio', function (req, res) {
    let model = getmodel();
    // model.head.script = ['Job/no2g.js'];
    model.main.data = [
        {
            title: "Second Hand Trading",
            img: "/static/images/second_m.png",
            description: ["- Cron Job for grepping data", "- Cron Job for Sending Email"]
        },
        {
            title: "Currency Exchange",
            img: "/static/images/currency_m.png",
            description: ["- Cron Job for Sending SMS"]
        },
        {
            title: "Video Site",
            img: "/static/images/video_m.png",
            description: ["- Upload and Format Videos"]
        },
        {
            title: "Dating Site",
            img: "",
            description: [""]
        },
        {
            title: "PlaceHolder",
            img: "",
            description: [""]
        }
    ];
    _render(res, 'Job/portfolio.ejs', model);
});

router.get('/questions', function (req, res) {
    let model = getmodel();
    _render(res, 'Job/question.ejs', model);
});

module.exports = {
    JobRouter: router
};


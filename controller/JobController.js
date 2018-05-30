'use strict';

const express = require('express');

const { _render, getmodel, makeAjax } = require(__dirname + '/../lib/Helper');
const Logger = require(__dirname + '/../lib/Logger');

var _router = express.Router();

_router.get('/portfolio', function (req, res) {
    let model = getmodel('www');
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
            img: "#",
            description: [""]
        },
        {
            title: "PlaceHolder",
            img: "#",
            description: [""]
        }
    ];
    _render(res, 'Job/portfolio.ejs', model);
});

_router.get('/countAL', function (req, res) {
    let model = getmodel('www', ['Job/countAl.js']);
    let data = {
        joinDate: '2017-06-12',
        alPerYear: 12,
        alused: 0,
        alLeft : 0,
        totalAl: 0,
        alHistory: [
            { date: "2018-04-26", count: 0.25 }
        ]
    };

    let timeDifference = new Date().getTime() - new Date(data.joinDate).getTime();
    data.totalAl = (timeDifference / (1000 * 3600 * 24) / 365) * data.alPerYear;

    data.alHistory.forEach(ele => {
        data.alused += ele.count;
    });
    data.alLeft = data.totalAl - data.alused;
    model.main.data = data;

    _render(res, 'Job/countAl.ejs', model);
});

module.exports = _router;


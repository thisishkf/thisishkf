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

_router.get('/questions', function (req, res) {
    let model = getmodel('www');
    model.main.data = [
        {
            title: "Career Path",
            question: "Is any promotion steps for the career"
        },
        {
            title: "Salary Review",
            question: "If there is salary review after probation"
        },
        {
            title: "AL",
            question: "How many AL and how to count"
        },
        {
            title: "SL",
            question: "How many AL and how to count"
        }
    ];

    _render(res, 'Job/question.ejs', model);
});

module.exports = _router;


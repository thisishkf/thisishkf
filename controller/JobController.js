'use strict';

const express = require('express');

const { _render, getmodel, makeAjax } = require(__dirname + '/../lib/Helper');
const Logger = require(__dirname + '/../lib/Logger');

var _router = express.Router();
const mysqldb = require(__dirname + '/../lib/MySQLService');

_router.get('/countAL', function (req, res) {
    let model = getmodel('www', ['Job/countAl.js']);
    let data = {
        joinDate: '2017-06-12',
        alPerYear: 12,
        alused: 0,
        alLeft: 0,
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


_router.get('/checkin', function (req, res) {
    const SQL_S_WORKLOG = "SELECT `create_timestamp` FROM worklog WHERE type = :type AND user_id = :user AND create_date = :date";
    const params = {
        type: 1,
        user: 1,
        date: `${new Date().toJSON().slice(0, 10)}`
    }
    mysqldb.selectOne(SQL_S_WORKLOG, params, function (result) {
        let model = getmodel('www');
        model.main.data = result;
        model.head.script = ['job/checkin.js'];
        _render(res, 'Job/checkin.ejs', model);
    });
});

_router.post('/checkin', function (req, res) {
    const SQL_I_WORKLOG_CHECKIN = "INSERT INTO `worklog` (`worklog_id`, `type`, `user_id`, `create_date`, `create_timestamp`) VALUES (null , 1, :user, CURDATE(), NOW())";
    mysqldb.insert(SQL_S_WORKLOG, { user: 1 }, function (result) {
        _makeAjax(res, result);
    });
});

_router.post('/checkout', function (req, res) {
    const SQL_I_WORKLOG_CHECOUT = "INSERT INTO `worklog` (`worklog_id`, `type`, `user_id`, `create_date`, `create_timestamp`) VALUES (null , 2, :user, CURDATE(), NOW())";
    mysqldb.insert(SQL_S_WORKLOG, { user: 1 }, function (result) {
        _makeAjax(res, result);
    });
});

module.exports = _router;


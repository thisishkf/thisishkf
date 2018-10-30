'use strict';

const express = require('express');

const { _render, getmodel, makeAjax } = require(__dirname + '/../lib/Helper');
const Logger = require(__dirname + '/../lib/Logger');
const { getAL } = require(__dirname + '/../Services/JobService');

var _router = express.Router();
const mysqldb = require(__dirname + '/../lib/MySQLService');

_router.get('/countAL', function (req, res) {
    let model = getmodel('www', ['Job/countAl.js']);
    let data = {
        startDate: '2018-07-16T00:00:00',
        alPerYear: 12,
        alHistory: [
            // { date: "2018-04-26", count: 0.25 }
        ]
    };
    model.main.data = getAL(data);
    _render(res, 'Job/countAl.ejs', model);
});

// TODO
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

// TODO
_router.post('/checkin', function (req, res) {
    const SQL_I_WORKLOG_CHECKIN = "INSERT INTO `worklog` (`worklog_id`, `type`, `user_id`, `create_date`, `create_timestamp`) VALUES (null , 1, :user, CURDATE(), NOW())";
    mysqldb.insert(SQL_I_WORKLOG_CHECKIN, { user: 1 }, function (result) {
        _makeAjax(res, result);
    });
});

// TODO
_router.post('/checkout', function (req, res) {
    const SQL_I_WORKLOG_CHECOUT = "INSERT INTO `worklog` (`worklog_id`, `type`, `user_id`, `create_date`, `create_timestamp`) VALUES (null , 2, :user, CURDATE(), NOW())";
    mysqldb.insert(SQL_I_WORKLOG_CHECOUT, { user: 1 }, function (result) {
        _makeAjax(res, result);
    });
});

module.exports = _router;


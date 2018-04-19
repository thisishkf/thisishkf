/*
 * Using npm moduels
 */
const http = require('http');
const url = require('url');
const path = require('path');
const express = require('express');
const app = express();
const { httpGet, httpPost } = require('./lib/httpRequest');

const port = 8099;

// middlewares
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/public/views'));
app.use(express.static(__dirname + '/public'));

const { IndexRouter } = require('./controller/IndexController');
const { UtilRouter } = require('./controller/UtilController');
app.use('', IndexRouter);
app.use('/util', UtilRouter);
app.listen(port, function () {
	console.log('Server Starting...');
});

app.get('/test', function (req, res) {
	res.status(200).end("test");
});

app.get('/', function (req, res) {
	res.status(200).render('index', {});
});

app.get('/countdown', function (req, res) {
	res.status(200).render('utils/countdown', {});
});

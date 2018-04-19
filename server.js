/*
 * Using npm moduels
 */
const http = require('http');
const url = require('url');
const path = require('path');
const express = require('express');
const app = express();
const config = require('./config');
const port = process.env.PORT || config.PORT;
const logger = require('./Services/Logger');

const cluster = require('cluster');
const numCPUs = require('os').cpus().length;

app.use(function (req, res, next) {
	logger.access(req);
	next();
});
// middlewares
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/public/views'));
app.use(express.static(__dirname + '/public'));
app.use('/static', express.static(__dirname + '/public/static'));

const { IndexRouter } = require('./controller/IndexController');
const { UtilRouter } = require('./controller/UtilController');

app.use('', IndexRouter);
app.use('/util', UtilRouter);

app.listen(port, function () {
	console.log('Server Starting...');
});

// const masterThreadOnStart = function () {
// 	logger.info(`Master thread [${process.pid}] start`);
// 	for (let i = 0; i < numCPUs; i++) {
// 		cluster.fork();
// 	}
// 	cluster.on('exit', (worker, code, signal) => {
// 		logger.info(`worker ${worker.process.pid} died`);
// 	});
// }

// const serverOnCreate = function () {
// 	server.listen(port, function () {
// 		mongodb.connect(DEFAULT_MONGO_URL).then(() => {
// 			mysqldb.connect().then(() => {
// 				serverOnStart();
// 				console.log(process.env.PWD);
// 			}).catch((err) => { serverOnDestory(err); });
// 		}).catch((err) => { serverOnDestory(err); });
// 	});
// }
// const serverOnStart = function () {
// 	logger.info(`Thread [${process.pid}] start`);
// 	logger.info(`Server Info: `);
// 	logger.info(`Start Time \t: ${Date()}`);
// 	logger.info(`listening on \t: ${port}`);
// }

// const serverOnRestart = function(){

// }

// const serverOnDestory = function (err = null) {
// 	logger.error(err);
// 	process.exit(1);
// }

// // if (cluster.isMaster) {
// // 	masterThreadOnStart();
// // } else {
// 	serverOnCreate();
// // }
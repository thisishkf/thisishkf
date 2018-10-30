/*
 * Using npm moduels
 */
const http = require('http');
const url = require('url');
const express = require('express');
const app = express();
const server = require('http').Server(app);
const socket = require('socket.io')(server);
const path = require('path');
const bodyParser = require('body-parser');

const cluster = require('cluster');
const numCPUs = require('os').cpus().length;

const config = require(__dirname + '/config');
const port = process.env.PORT || config.PORT;

const Logger = require(__dirname + '/lib/Logger');
const mysqldb = require(__dirname + '/lib/MySQLService');
const mongodb = require(__dirname + '/lib/MongoService');
const redisdb = require(__dirname + '/lib/RedisService');

// middlewares
app.use(function (req, res, next) {
	Logger.access(req);
	next();
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.set('view engine', 'ejs');
app.set('views', __dirname + '/public/views');
app.use(express.static(__dirname + '/public'));
app.use('/static', express.static(__dirname + '/public/static'));

// Includes Router
app.use('', require('./Controller/IndexController'));
app.use('/util', require('./Controller/UtilController'));
app.use('/game', require('./Controller/GameController'));
app.use('/job', require('./Controller/JobController'));
app.use('/admin', require('./Controller/AdminController'));
app.use('/football', require('./Controller/FootballController'));

const masterThreadOnStart = function () {
	Logger.info(`Master thread [${process.pid}] start`);
	for (let i = 0; i < numCPUs; i++) {
		cluster.fork();
	}
	cluster.on('exit', (worker, code, signal) => {
		Logger.info(`worker ${worker.process.pid} died`);
	});
}

const serverOnCreate = function () {
	server.listen(port, function () {
		// let DEFAULT_MONGO_URL = `mongodb://${config.MONGODB.host}:${config.MONGODB.port}/${config.MONGODB.db}`;
		mongodb.connect().then(() => {
			mysqldb.connect()
			.then(() => {
				serverOnStart();
			});
		}).catch((err) => { serverOnDestory(err); });
	});
}
const serverOnStart = function () {
	Logger.info(`Thread [${process.pid}] start`);
	Logger.info(`Server Info: `);
	Logger.info(`Start Time \t: ${Date()}`);
	Logger.info(`listening on \t: ${port}`);
}

const serverOnRestart = function () {

}

const serverOnDestory = function (err = null) {
	Logger.error(err);
	process.exit(1);
}

// if (cluster.isMaster) {
// 	masterThreadOnStart();
// } else {
	serverOnCreate();
// }
const redis = require('redis');

const redisConfig = require('./config.json');
const instance = {};
const logger = require('../Logger');

const _initializeInstance = function (callback = function () { }) {
	redisInfo(redisConfig);

	instance = redis.createClient(redisConfig.config);
	instance.on('error', function (err) {
		logger.error('[Error] Redis Error : ' + err);
		callback("fail");
	});

	instance.on('connect', function () {
		logger.info('Redis Server connected');
		callback("success");
	});
};

const _getInstance = function () {
	return instance;
};

const _get = function (key, callback = function () { }) {
	instance.get(key, function (err, reply) {
		callback(err, reply);
	});
};

const _set = function (key, value, callback = function () { }) {
	logger.info("Redis Set " + key + "\t" + value + "\t\t : ");
	instance.set(key, value, function (err, reply) {
		callback();
	});
};
const _updateMany = function (keyValuePair, callback = function () { }) {
	for (let i in keyValuePair) {
		instance.set(i, keyValuePair[i], function (err, reply) {
			logger.info("Redis Set " + i + "\t\t\t : " + reply);
		});
	}
	callback();
};

module.exports = {
	initializeInstance: _initializeInstance,
	getInstance: _getInstance,
	get: _get,
	set: _set,
	updateMany: _updateMany
};

/**
 * Global Functions 
 */


const redisInfo = function (redisConfig) {
	logger.info('===========================================');
	logger.info('Connecting to REDIS Server');
	logger.info('Host \t\t: ' + redisConfig.config.host);
	logger.info('Port \t\t: ' + redisConfig.config.port);
	logger.info('Start Time \t: ' + Date());
};
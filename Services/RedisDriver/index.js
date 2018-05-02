var redis = require('redis');

var redisConfig = require('./config.json');
var instance = {};

module.exports = {
	initializeInstance: function (callback = noCallback) {
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

	},
	getInstance: function () {
		return instance;
	},
	get: function (key, callback = noCallback) {
		instance.get(key, function (err, reply) {
			callback(err, reply);
		});
	},
	set: function (key, value, callback = noCallback) {
		logger.info("Redis Set " + key + "\t" + value +"\t\t : " );
		instance.set(key, value, function (err, reply) {
			callback;
		});
	},
	updateMany: function (keyValuePair, callback = noCallback) {

		for (var i in keyValuePair) {
			instance.set(i, keyValuePair[i], function (err, reply) {
				logger.info("Redis Set " + i + "\t\t\t : " + reply);
			});
		}
		callback;
	}

};
/**
 * Global Functions 
 */
var noCallback = function (data) {};

var redisInfo = function (redisConfig) {
	logger.info('===========================================');
	logger.info('Connecting to REDIS Server');
	logger.info('Host \t\t: ' + redisConfig.config.host);
	logger.info('Port \t\t: ' + redisConfig.config.port);
	logger.info('Start Time \t: ' + Date());
};